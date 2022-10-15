import Address from "@modules/models/address/Address";
import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import Card from "@modules/models/cards/Card";
import Cart from "@modules/models/sales/Cart";
import Payment from "@modules/models/sales/Payment";
import Purchase from "@modules/models/sales/Purchase";
import Person from "@modules/models/users/Person";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { IGetEntity } from "./interface/IViewHelper";
import { VHAbstract } from "./VHAbstract";

export class VHPurchase extends VHAbstract {
    getEntity(req: Request): Purchase {
        const {
            payment_address,
            delivery_address,
            cards,
            cart_id,
            status,
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);
        if (!userInfo.person) {
            throw new Error('Dados da pessoa fisica não encontrados.');
        }

        const personInstance = new Person({ id: userInfo.person });
        const purchaseInstance = new Purchase();
        const cartInstance = new Cart()
        cartInstance.person = personInstance;
        purchaseInstance.cart = cartInstance;

        if (req.method == 'POST') {
            if (!userInfo.person) {
                throw new Error('Dados da pessoa fisica não encontrados.');
            }
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

        if (cards) {
            purchaseInstance.payments = cards.map((payment: any) => {
                const { value, ...card } = payment;
                const paymentInstance = new Payment({ value });
                paymentInstance.card = new Card({ ...card });

                return paymentInstance;
            });
        }

        return purchaseInstance;
    }

    findEntity(req: Request): IGetEntity {
        return {
            entity: this.getEntity(req),
            relations: ['cart']
        }
    }
}