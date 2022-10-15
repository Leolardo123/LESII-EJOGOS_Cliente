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
import { ValidateCard } from "./ValidateCard";
import { ValidateCart } from "./ValidateCart";
import { ValidateCoupom } from "./ValidateCoupom";
import { ValidateProduct } from "./ValidateProduct";

export class ValidatePurchase implements IValidate {
    constructor(
        private validateCart: ValidateCart,
        private validateAddress: ValidateAddress,
        private validateProduct: ValidateProduct,
        private validateCoupom: ValidateCoupom,
        private validateCard: ValidateCard,
    ) { }
    async validate(entity: Purchase): Promise<void> {
        if (!(entity instanceof Purchase)) {
            throw new Error('Entidade inválida, esperava item do carrinho.');
        }

        const daoAddress = new DAOAddress();
        if (!entity.id) {
            if (!entity.cart) {
                throw new Error('Carrinho não encontrado.');
            }

            const daoCart = new DAOCart();
            const cartExists = await daoCart.findOne({
                where: { id: entity.cart.id },
            });

            if (!cartExists) {
                throw new Error('Carrinho não encontrado.');
            }

            if (!cartExists.items) {
                throw new Error('Carrinho vazio.');
            }

            await this.validateCart.validate(entity.cart);

            if (!entity.cart.person || !entity.cart.person.id) {
                throw new Error('Pessoa não encontrada (Compra).');
            }

            if (!entity.payment_address || !entity.payment_address.id) {
                throw new Error('Endereço de pagamento não selecionado.');
            }

            if (entity.payment_address.id) {
                const paymentAddress = await daoAddress.findOne({
                    where: {
                        id: entity.payment_address.id
                    }
                });
                if (!paymentAddress) {
                    throw new Error('Endereço de pagamento não encontrado.');
                }
                entity.payment_address = paymentAddress;
            } else {
                await this.validateAddress.validate(entity.payment_address);
            }

            if (!entity.delivery_address || !entity.delivery_address.id) {
                throw new Error('Endereço de entrega não selecionado.');
            }

            if (entity.delivery_address.id) {
                const deliveryAddress = await daoAddress.findOne({
                    where: {
                        id: entity.delivery_address.id
                    }
                });
                if (!deliveryAddress) {
                    throw new Error('Endereço de entrega não encontrado.');
                }
                entity.delivery_address = deliveryAddress;
            } else {
                await this.validateAddress.validate(entity.delivery_address);
            }

            if (
                (!entity.payments || entity.payments.length <= 0)
                &&
                (!entity.coupons || entity.coupons.length <= 0)
            ) {
                throw new Error('Selecione pelo menos um cartão ou cupom válido.');
            }

            let paymentTotal = 0;
            if (entity.payments) {
                const daoCard = new DAOCard();
                const promise = entity.payments.map(async (payment) => {
                    const coupomExists = daoCard.findOne({
                        where: {
                            id: payment.card.id
                        }
                    });

                    if (!coupomExists) {
                        throw new Error('Cupom não encontrado.');
                    }

                    await this.validateCard.validate(payment.card);

                    paymentTotal += Number(payment.value);
                }, 0)
                await Promise.all(promise);
            }

            let couponTotal = 0;
            if (entity.coupons) {
                const daoCoupom = new DAOCoupom();
                const promise = entity.coupons.map(async (coupon) => {
                    const coupomExists = daoCoupom.findOne({
                        where: {
                            id: coupon.id
                        }
                    });

                    if (!coupomExists) {
                        throw new Error('Cupom não encontrado.');
                    }

                    await this.validateCoupom.validate(coupon);

                    couponTotal += Number(coupon.value);
                }, 0)
                await Promise.all(promise);
            }

            const cartTotal = cartExists.getTotalPrice() || 0;
            const tobePaid = cartTotal - couponTotal;
            if (tobePaid < 0) {//Se cupom vale mais que o total, um cupom de troco deve ser gerado
                const newCoupom = new Coupom({
                    value: tobePaid * -1,
                    person: entity.cart.person,
                    type: CoupomTypeEnum.RETURN_PRODUCT,
                });
                entity.cart.person.coupons.push(newCoupom);
            }

            if (paymentTotal < tobePaid) {
                throw new Error('Valor total dos cartões é menor que o valor total da compra.');
            }

            if (paymentTotal > tobePaid) {
                throw new Error('Valor total dos cartões é maior que o valor total da compra.');
            }

            if (entity.payments) {
                const daoCard = new DAOCard();
                const promise = entity.payments.map(async payment => {
                    const cardExists = await daoCard.findOne({
                        where: { id: payment.card.id },
                    })
                    if (!cardExists) {
                        throw new Error('Um dos cartões selecionados não é válido.');
                    }
                });
                await Promise.all(promise);
            }

            if (cartExists.items.length <= 0) {
                throw new Error('Nenhum produto selecionado')
            }

            const promise = cartExists.items.map(async (item) => {
                item.product.stock -= item.quantity
                await this.validateProduct.validate(item.product);
            })
            await Promise.all(promise);

            entity.cart = cartExists;
            entity.total_price = cartTotal;
            entity.cart.isOpen = false;
        }

        if (entity.id) {
            const daoPurchase = new DAOPurchase();
            const purchaseExists = await daoPurchase.findOne({
                where: { id: entity.id },
            });

            if (!purchaseExists) {
                throw new Error('Compra não encontrada.');
            }

            if (entity.status) {
                const nextStatusExists = purchaseStatusOrder.find(orders => orders.status === entity.status)
                if (!nextStatusExists) {
                    throw new Error('Estado de compra não existe.');
                }

                const statusExists = purchaseStatusOrder.find(orders => orders.status === purchaseExists.status)
                if (!statusExists?.next.includes(entity.status as PurchaseStatusEnum)) {
                    throw new Error(`Não é possível alterar o estado de compra de ${purchaseExists.status} para ${entity.status}.`);
                }
            }
        }
    }
}
