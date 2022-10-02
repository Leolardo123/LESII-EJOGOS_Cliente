import Address from "@modules/models/address/Address";
import CartItem from "@modules/models/sales/CartItem";
import Purchase from "@modules/models/sales/Purchase";
import Person from "@modules/models/users/Person";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";

export class VHCartItem extends VHAbstract {
    getEntity(req: Request): CartItem {
        const { 
            payment_address,
            delivery_address,
            ...purchase
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);
        if(!userInfo.person){
            throw new Error('Dados da pessoa fisica não encontrados.');
        }

        const personInstance = new Person({ id: userInfo.person });
        const purchaseInstance = new Purchase(purchase);
        if(id){
            purchaseInstance.id = Number(id);
        }

        if(payment_address){
            purchaseInstance.payment_address = new Address({ ...payment_address });
            if(delivery_address.save){
                purchaseInstance.delivery_address.person = personInstance;
            }
        }

        if(delivery_address){
            purchaseInstance.delivery_address = new Address({ ...delivery_address });
            if(delivery_address.save){
                purchaseInstance.delivery_address.person = personInstance;
            }
        }

        return purchase;
    }
}