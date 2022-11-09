import Address from "@modules/models/address/Address";
import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import Card from "@modules/models/cards/Card";
import Cart from "@modules/models/sales/Cart";
import Coupom from "@modules/models/sales/Coupom";
import Payment from "@modules/models/sales/Payment";
import Purchase from "@modules/models/sales/Purchase";
import Person from "@modules/models/users/Person";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { FindManyOptions, ILike } from "typeorm";
import { IGetEntity } from "./interface/IViewHelper";
import { VHAbstract } from "./VHAbstract";

export class VHPurchase extends VHAbstract {
    getEntity(req: Request): Purchase {
        const {
            payment_address,
            delivery_address,
            cards,
            coupons,
            cart_id,
            status,
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);

        const purchaseInstance = new Purchase();

        if (userInfo.person) {
            const personInstance = new Person({ id: userInfo.person });
            const cartInstance = new Cart()
            cartInstance.person = personInstance;
            purchaseInstance.cart = cartInstance;
        }

        if (id) {
            purchaseInstance.id = Number(id);
        }

        if (cart_id) {
            purchaseInstance.cart.id = cart_id;
        }

        if (status) {
            if (userInfo.role != 'admin') {
                throw new Error('Operação não autorizada.');
            }
            purchaseInstance.status = status;
        }

        if (payment_address) {
            purchaseInstance.payment_address = new Address({ ...payment_address });
            if (!payment_address.id) {
                purchaseInstance.payment_address.address_type = new AddressType({
                    id: payment_address.address_type_id
                })
                purchaseInstance.payment_address.place_type = new PlaceType({
                    id: payment_address.place_type_id
                })
            }
        }

        if (delivery_address) {
            purchaseInstance.delivery_address = new Address({ ...delivery_address });
            if (!delivery_address.id) {
                purchaseInstance.delivery_address.address_type = new AddressType({
                    id: delivery_address.address_type_id
                })
                purchaseInstance.delivery_address.place_type = new PlaceType({
                    id: delivery_address.place_type_id
                })
            }
        }

        if (cards && cards.length > 0) {
            purchaseInstance.payments = cards.map((payment: any) => {
                const { value, ...card } = payment;
                const paymentInstance = new Payment({
                    value: Number(value) ? Number(value) : 0
                });
                paymentInstance.card = new Card({ id: card.id });

                return paymentInstance;
            });
        }

        if (coupons && coupons.length > 0) {
            purchaseInstance.coupons = coupons.map((coupon: any) => {
                return new Coupom({
                    id: coupon.id,
                });
            });
        }

        return purchaseInstance;
    }

    findEntity(req: Request): IGetEntity {
        const { search, page, limit } = req.query;

        let whereParams = {} as FindManyOptions<Purchase>;
        if (search) {
            whereParams.where = [
                { status: ILike(`%${search}%`) },
            ]

            if (Number(search)) {
                whereParams.where.push({ id: Number(search) });
            }
        }

        whereParams.relations = [
            'cart'
        ]


        if (page || limit) {
            whereParams.take = Number(limit) || 10;
            whereParams.skip = (Number(page || 1) - 1) * whereParams.take;
        }

        return {
            entity: new Purchase(),
            whereParams,
        }
    }
}