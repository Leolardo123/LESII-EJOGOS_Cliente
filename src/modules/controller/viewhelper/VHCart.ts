
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
                const productInstance = new Product({ id: Number(item.product.id) });
                const cartItemInstance = new CartItem({ 
                    quantity: item.quantity ? item.quantity : 1,
                    product: productInstance,
                });

                if(item.id){
                    cartItemInstance.id = Number(item.id);
                }

                return cartItemInstance;
            })
        }

        return cartInstance;
    }

        
    setView(req: Request, res: any, result: Cart[] | Cart | string): void {
        if (typeof result === 'string') {
            res.status(201).json({ message: result });
        } else {
            if(result instanceof Array){
                res.status(201).json(
                    result.map((cart: Cart) => {
                        return {
                            ...cart,
                            total_price: cart.getTotalPrice(),
                        }
                    })
                );
            } else {
                res.status(201).json({...result, total_price: result.getTotalPrice()});
            }
        }
    }
}