import CartItem from "@modules/models/sales/CartItem";
import Purchase from "@modules/models/sales/Purchase";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";

export class VHCartItem extends VHAbstract {
    getEntity(req: Request): CartItem {
        const { 
            ...purchase
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);
        if(!userInfo.person){
            throw new Error('Dados da pessoa fisica não encontrados.');
        }

        const purchaseInstance = new Purchase(purchase);
        if(id){
            purchaseInstance.id = Number(id);
        }

        return purchase;
    }
}