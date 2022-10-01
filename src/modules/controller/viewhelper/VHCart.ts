
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";
import Cart from '@modules/models/sales/Cart';
import CartItem from "@modules/models/sales/CartItem";
import Product from "@modules/models/products/Product";
import Person from "@modules/models/users/Person";

export class VHCart extends VHAbstract {
    getEntity(req: Request): Cart {
        const {
            ...cart
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);
        
        const cartInstance = new Cart();
        const personInstance = new Person({ id: userInfo.person });
        cartInstance.person = personInstance;

        if(id){
            cartInstance.id = Number(id);
        }

        if(cart.items){
            cartInstance.items = cart.items.map((item: any) => {
                const productInstance = new Product({ id: item.product_id });
                const cartItemInstance = new CartItem({ 
                    quantity: item.quantity,
                    product: productInstance,
                });

                if(item.id){
                    cartItemInstance.id = item.id;
                }

                return cartItemInstance;
            })
        }

        return cartInstance;
    }
}