import Address from "@modules/models/address/Address";
import Card from "@modules/models/cards/Card";
import Cart from "@modules/models/sales/Cart";
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
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);
        if(!userInfo.person){
            throw new Error('Dados da pessoa fisica não encontrados.');
        }

        const personInstance = new Person({ id: userInfo.person });
        const purchaseInstance = new Purchase();
        const cartInstance = new Cart()
        cartInstance.person = personInstance;
        purchaseInstance.cart = cartInstance;

        if(id){
            purchaseInstance.id = Number(id);
        }

        if(cart_id){
            purchaseInstance.cart.id = cart_id;
        }

        if(payment_address){
            purchaseInstance.payment_address = new Address({ ...payment_address });
        }

        if(delivery_address){
            purchaseInstance.delivery_address = new Address({ ...delivery_address });
        }

        if(cards){
            purchaseInstance.cards = cards.map((card: any) => {
                return new Card({ ...card });
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