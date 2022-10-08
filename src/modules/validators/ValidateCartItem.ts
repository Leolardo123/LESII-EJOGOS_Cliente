import { DAOCart } from "@modules/repositories/DAOCart";
import { DAOProduct } from "@modules/repositories/DAOProducts";
import CartItem from "../models/sales/CartItem";
import { IValidate } from "./IValidate";

export class ValidateCartItem implements IValidate{
    constructor(){}
    async validate(entity: CartItem): Promise<void> {
        if(!(entity instanceof CartItem)){
            throw new Error('Entidade inválida, esperava item do carrinho.');
        }

        const where = entity.cart.id ? { 
            id: entity.cart.id
        } : { 
            person_id: entity.cart.person.id,
            isOpen: true
        };
        
        const daoCart = new DAOCart();
        const cartExists = await daoCart.findOne({ 
            where,
            relations: ['items', 'person']
        })
2
        if(cartExists){
            if(!cartExists.isOpen || cartExists.purchase){
                throw new Error('Carrinho já foi finalizado.');
            }

            const itemExists = cartExists.items.find(
                item => item.product.id === entity.product.id
            );

            if(itemExists){
                entity.id = itemExists.id;

                if(!entity.quantity){
                    entity.quantity = itemExists.quantity;
                }

                if(entity.product.id != itemExists.product.id){
                    throw new Error('Produto inválido.');
                }
            }

            entity.cart.id = cartExists.id;
        } else {
            if(!entity.cart.id){
                throw new Error('Carrinho não encontrado.');
            }
        }

        if(!entity.product || !entity.product.id){
            throw new Error('Produto não especificado.');
        }

        const daoProduct = new DAOProduct();
        const productExists = await daoProduct.findOne({
            where: { id: entity.product.id }
        });

        if(!productExists || !productExists.isActive){
            throw new Error('Produto não existe ou está indísponível no momento.');
        }

        if(!entity.quantity){
            entity.quantity = 1;
        }

        entity.price = productExists.price * entity.quantity;
    }
}