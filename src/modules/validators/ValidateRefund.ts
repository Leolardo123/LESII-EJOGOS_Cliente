import Coupom from "@modules/models/sales/Coupom";
import { PurchaseStatusEnum } from "@modules/models/sales/enum/PurchaseStatus";
import { RefundStatusEnum } from "@modules/models/sales/enum/RefundStatus";
import Refund from "@modules/models/sales/Refund";
import { DAOCartItem } from "@modules/repositories/DAOCartItem";
import { DAORefund } from "@modules/repositories/DAORefund";
import { refundStatusOrder } from "./helpers/refundStatusOrder";
import { IValidate } from "./IValidate";

export class ValidateRefund implements IValidate {
    constructor(
    ) { }
    async validate(entity: Refund): Promise<void> {


        if (!entity.id) {
            const daoCartItem = new DAOCartItem();
            const cartItem = await daoCartItem.findOne({
                where: {
                    id: entity.cart_item?.id
                },
                relations: ['cart', 'cart.purchase', 'refund']
            })

            if (!cartItem) {
                throw new Error('Item não encontrado.');
            }

            if (!cartItem.cart.purchase) {
                throw new Error('Compra não encontrada.');
            }
            if (cartItem.cart.purchase.status !== PurchaseStatusEnum.FINISHED) {
                throw new Error('Pode efetuar troca apenas em compras finalizadas.');
            }
            if (!entity.reason) {
                throw new Error('Informe o motivo da troca.');
            }
            if (cartItem.refund) {
                entity.id = cartItem.refund.id;
            }
            if (
                cartItem.refund
            ) {
                throw new Error('Item já está em troca.');
            }

            entity.cart_item = cartItem;
        }

        if (entity.id) {
            const daoRefund = new DAORefund();
            const refund = await daoRefund.findOne({
                where: {
                    id: entity.id
                },
                relations: [
                    'cart_item',
                    'cart_item.cart',
                    'cart_item.cart.person',
                    'cart_item.product',
                ]
            })

            if (!refund) {
                throw new Error('Troca não encontrada.');
            }

            const statusExists = refundStatusOrder.find(
                status => status.status === refund.status &&
                    status.next.includes(entity.status as RefundStatusEnum)
            )

            if (!statusExists) {
                throw new Error(`Não é possível alterar o status de ${refund.status} para ${entity.status}.`);
            }

            if (entity.status === RefundStatusEnum.FINISHED) {
                const newCoupom = new Coupom({ is_used: false, value: refund.cart_item.price });

                if (!refund.cart_item.cart.person) {
                    throw new Error('Pessoa não encontrada, falha ao gerar cupom de troca.');
                }

                if (entity.restock === true) {
                    entity.cart_item = refund.cart_item;
                    entity.cart_item.product.stock += refund.cart_item.quantity;
                }

                newCoupom.person = refund.cart_item.cart.person;
                entity.coupom = newCoupom;
            }
        }
    }
}