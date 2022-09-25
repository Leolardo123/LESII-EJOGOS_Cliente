import CartItem from "@modules/models/sales/CartItem";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";

export class VHCartItem extends VHAbstract {
    getEntity(req: Request): CartItem {
        const { 
            ...cart_item
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);

        const cartItemInstance = new CartItem()
        Object.assign(cartItemInstance, cart_item)

        if(id){
            Object.assign(cartItemInstance, { id: Number(id) })
        }

        return cartItemInstance;
    }
}