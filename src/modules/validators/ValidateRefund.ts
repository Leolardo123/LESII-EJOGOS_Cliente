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

        if (!entity.id) {
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
                cartItem.refund &&
                cartItem?.refund?.status != RefundStatusEnum.CANCELED &&
                cartItem?.refund?.status != RefundStatusEnum.REFUSED
            ) {
                throw new Error('Item está em troca.');
            }
        }

        if (entity.id) {
            const daoRefund = new DAORefund();
            const refund = await daoRefund.findOne({
                where: {
                    id: entity.id
                }
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
                const newCoupom = new Coupom({ is_used: false, value: cartItem.price * cartItem.quantity });

                if (!cartItem.cart.person) {
                    throw new Error('Pessoa não encontrada, falha ao gerar cupom de troca.');
                }

                entity.cart_item.cart.person.coupons.push(newCoupom);
            }
        }
    }
}