import Product from "@modules/models/products/Product";
import Cart from "@modules/models/sales/Cart";
import CartItem from "@modules/models/sales/CartItem";
import Person from "@modules/models/users/Person";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";

export class VHCartItem extends VHAbstract {
    getEntity(req: Request): CartItem {
        const {
            quantity,
            product,
            ...cart_item
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);
        if(!userInfo.person){
            throw new Error('Dados da pessoa fisica não encontrados.');
        }

        const cartItemInstance = new CartItem(cart_item);
        if(id){
            cartItemInstance.id = Number(id);
        }

        const personInstance = new Person({ id: userInfo.person });
        cartItemInstance.cart = new Cart({ 
            person: personInstance,
        });

        if(product){
            const productInstance = new Product({ id: Number(product.id) });
            cartItemInstance.product = productInstance;
        }
        
        if(cart_item.cart_id){
            cartItemInstance.cart.id = Number(cart_item.cart_id);
        }

        return cartItemInstance;
    }
}