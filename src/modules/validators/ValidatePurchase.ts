import ProductHistory from "@modules/models/products/ProductHistory";
import Coupom from "@modules/models/sales/Coupom";
import { CoupomTypeEnum } from "@modules/models/sales/enum/CoupomTypes";
import { PurchaseStatusEnum } from "@modules/models/sales/enum/PurchaseStatus";
import { DAOAddress } from "@modules/repositories/DAOAddress";
import { DAOCard } from "@modules/repositories/DAOCard";
import { DAOCart } from "@modules/repositories/DAOCart";
import { DAOCoupom } from "@modules/repositories/DAOCoupom";
import { DAOPurchase } from "@modules/repositories/DAOPurchase";
import Purchase from "../models/sales/Purchase";
import { purchaseStatusOrder } from "./helpers/purchaseStatusOrder";
import { IValidate } from "./IValidate";
import { ValidateAddress } from "./ValidateAddress";

export class ValidatePurchase implements IValidate {
  constructor(
    private validateAddress: ValidateAddress
  ) { }

  async validate(entity: Purchase): Promise<void> {
    if (!(entity instanceof Purchase)) {
      throw new Error("Entidade inválida, esperava item do carrinho.");
    }

    const daoAddress = new DAOAddress();
    if (!entity?.id) {
      if (!entity.cart) {
        throw new Error("Carrinho não encontrado.");
      }

      if (!entity.coupons) {
        entity.coupons = [];
      }

      const daoCart = new DAOCart();
      const cartExists = await daoCart.findOne({
        where: { id: entity.cart?.id },
        relations: ["person"],
      });

      if (!cartExists) {
        throw new Error("Carrinho não encontrado.");
      }

      if (!cartExists.items) {
        throw new Error("Carrinho vazio.");
      }

      if (!entity.cart.person || !entity.cart.person?.id) {
        throw new Error("Pessoa não encontrada (Compra).");
      }

      if (!entity.payment_address) {
        throw new Error("Endereço de pagamento não selecionado.");
      }

      if (entity.payment_address?.id) {
        const paymentAddress = await daoAddress.findOne({
          where: {
            id: entity.payment_address?.id,
          },
        });
        if (!paymentAddress) {
          throw new Error("Endereço de pagamento não encontrado.");
        }
        entity.payment_address = paymentAddress;
      } else {
        await this.validateAddress.validate(entity.payment_address);
      }

      if (!entity.delivery_address) {
        throw new Error("Endereço de entrega não selecionado.");
      }

      if (entity.delivery_address?.id) {
        const deliveryAddress = await daoAddress.findOne({
          where: {
            id: entity.delivery_address?.id,
          },
        });
        if (!deliveryAddress) {
          throw new Error("Endereço de entrega não encontrado.");
        }
        entity.delivery_address = deliveryAddress;
      } else {
        await this.validateAddress.validate(entity.delivery_address);
      }

      if (
        (!entity.payments || entity.payments.length <= 0) &&
        (!entity.coupons || entity.coupons.length <= 0)
      ) {
        throw new Error("Selecione pelo menos um cartão ou cupom válido.");
      }

      if (cartExists.items.length <= 0) {
        throw new Error("Nenhum produto selecionado");
      }

      let cartTotal = cartExists.getTotalPrice() || 0;
      const daoCoupom = new DAOCoupom();

      let coupomTotal = 0;
      let discount = 0;
      let remainingCoupomValue = 0;
      let discountCoupons = [] as Coupom[];

      if (entity.coupons && entity.coupons.length > 0) {
        const promise = entity.coupons.map(async (coupon) => {
          const coupomExists = await daoCoupom.findOne({
            where: {
              id: coupon.id,
            },
            relations: ["person"],
          });

          if (!coupomExists) {
            throw new Error("Cupom não encontrado.");
          }

          if (coupomExists.is_used) {
            throw new Error("Cupom já utilizado.");
          }

          if (coupomExists.person?.id != entity.cart?.person?.id) {
            throw new Error("Cupom não pertence a pessoa.");
          }

          coupon.is_used = true;
          coupon.person = null;

          if (coupomExists.type === CoupomTypeEnum.RETURN_PRODUCT) {
            coupomTotal += Number(coupomExists.value);
          }

          if (coupomExists.type === CoupomTypeEnum.DISCOUNT) {
            if (discountCoupons.length > 0) {
              throw new Error('Apenas um cupom de desconto pode ser usado por compra')
            }

            discount += coupomExists.value / 100;
            discountCoupons.push(coupomExists);
          }

          return coupon;
        });
        entity.coupons = await Promise.all(promise);
        cartTotal = Math.floor(cartTotal * (1 - discount));
        cartTotal -= coupomTotal;

        if (cartTotal < 0) {
          remainingCoupomValue = Math.abs(cartTotal);
          cartTotal = 0;
        }
      }

      let paymentTotal = 0;
      if (entity.payments) {
        const daoCard = new DAOCard();
        const promise = entity.payments.map(async (payment) => {
          const cardExists = await daoCard.findOne({
            where: {
              id: payment.card?.id,
            },
            relations: ["person", "brand"],
          });

          if (!cardExists) {
            throw new Error("Cartão não encontrado.");
          }

          if (!cardExists.person || !cardExists.person?.id) {
            throw new Error("Cartão inválido.");
          }

          if (!cardExists.brand) {
            throw new Error(`Cartão com final ${cardExists.number.substring(12)} não possui bandeira válida.`);
          }

          if (
            payment.value < (10 - coupomTotal)
          ) {
            throw new Error("Valor mínimo para cartões de crédito é R$ 10,00.");
          }

          paymentTotal += Number(payment.value);

          return payment;
        });
        await Promise.all(promise);

        if (paymentTotal > cartTotal) {
          throw new Error("Valor total dos cartões é maior que o valor total do carrinho.");
        }

        if (paymentTotal < cartTotal) {
          throw new Error("Pagamento insuficiente para esta compra.");
        }
      }

      if (remainingCoupomValue > 0) {
        // Se cupom vale mais que o total, um cupom de troco deve ser gerado
        const newCoupom = new Coupom({
          created_at: new Date(),
          is_used: false,
          value: remainingCoupomValue,
          type: CoupomTypeEnum.RETURN_PRODUCT,
          person: entity.cart?.person,
          purchase: null,
        });
        entity.coupons.push(newCoupom);
      }

      if (paymentTotal >= 200) {
        // Se o pagamento for maior que 200, um cupom de desconto deve ser gerado
        const quantityCoupons = Math.floor(paymentTotal / 200);
        for (let i = 0; i < quantityCoupons; i++) {
          const newCoupom = new Coupom({
            created_at: new Date(),
            is_used: false,
            value: 10,
            type: CoupomTypeEnum.DISCOUNT,
            person: entity.cart?.person,
            purchase: null,
          });
          entity.coupons.push(newCoupom);
        }
      }

      const promise = cartExists.items.map(async (item) => {
        item.product.stock -= item.quantity;
        if (!item.product.isActive) {
          throw new Error(
            `Produto ${item.product.name} não está mais disponível.`
          );
        }

        if (item.product.stock < 0) {
          throw new Error(
            `Produto ${item.product.name} não possui estoque suficiente.`
          );
        }

        if (item.product.stock == 0) {
          item.product.isActive = false;
          const productHistory = new ProductHistory({
            action: 'Produto desativado automaticamente',
            reason: 'FORA DE MERCADO',
          });

          item.product.history.push(productHistory);
        }
      });
      await Promise.all(promise);

      entity.cart.id = cartExists.id;
      entity.cart.items = cartExists.items;
      entity.total_price = cartTotal;
      entity.cart.isOpen = false;
    } else {
      const daoPurchase = new DAOPurchase();
      const purchaseExists = await daoPurchase.findOne({
        where: { id: entity?.id },
      });

      if (!purchaseExists) {
        throw new Error("Compra não encontrada.");
      }

      if (entity.status) {
        const statusExists = purchaseStatusOrder.find(
          (orders) =>
            orders.status == purchaseExists.status &&
            orders.next.includes(entity.status as any)
        );
        if (!statusExists) {
          throw new Error(
            `Não é possível alterar o estado de compra de ${purchaseExists.status} para ${entity.status}.`
          );
        }
      }
    }
  }
}
