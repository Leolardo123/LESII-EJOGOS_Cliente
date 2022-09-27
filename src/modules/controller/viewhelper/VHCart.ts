
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

        const cartInstance = new Cart();
        Object.assign(cartInstance, cart);
        cartInstance.person_id = userInfo.id;

        if(id){
            Object.assign(cartInstance, { id: Number(id) });
        }

        return cartInstance;
    }
}