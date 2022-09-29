
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";
import Cart from '@modules/models/sales/Cart';

export class VHCart extends VHAbstract {
    getEntity(req: Request): Cart {
        const {
            ...cart
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);

        if(!userInfo.person){
            throw new Error('Dados da pessoa fisica não encontrados.');
        }

        const cartInstance = new Cart(cart);
        cartInstance.person_id = userInfo.person;

        if(id){
            cartInstance.id = Number(id);
        }

        return cartInstance;
    }
}