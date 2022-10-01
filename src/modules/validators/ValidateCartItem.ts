import { DAOCart } from "@modules/repositories/DAOCart";
import { DAOCartItem } from "@modules/repositories/DAOCartItem";
import { DAOProduct } from "@modules/repositories/DAOProducts";
import CartItem from "../models/sales/CartItem";
import { IValidate } from "./IValidate";

export class ValidateCartItem implements IValidate{
    constructor(){}
    async validate(entity: CartItem): Promise<void> {
        if(!(entity instanceof CartItem)){
            throw new Error('Entidade inválida, esperava item do carrinho.');
        }

        if(entity.quantity < 1){
            throw new Error('Quantidade deve ser maior que 0 (Item do Carrinho).');
        }

        const daoProduct = new DAOProduct();
        const productExists = await daoProduct.findOne({ 
            where: { id: entity.product.id, isActive: true }
        });

        if(!productExists){
            throw new Error('Produto não existe ou está indísponível no momento (Item do Carrinho).');
        }

        if(!entity.cart || !entity.cart.id){
            throw new Error('Carrinho não encontrado (Item do Carrinho).');
        }

        const where = entity.id ? { 
            id: entity.id 
        } : { 
            product_id: productExists.id, 
            cart_id: entity.cart.id
        };

        
        const daoCartItem = new DAOCartItem();
        const cartItemExists = await daoCartItem.findOne({ 
            where,
            relations: ['cart', 'cart.person']
        })

        if(!entity.id){
            if(cartItemExists){
                entity.id = cartItemExists.id;
                entity.quantity += 1;
            }
            if(!entity.product.id){
                throw new Error('nenhum produto selecionado (Item do Carrinho).');
            }
        } else {
            if(!cartItemExists){
                throw new Error('Item não encontrado.');
            }
        }

        if(productExists.stock < entity.quantity){
            throw new Error(`Não há quantidade suficiente em estoque (Item do Carrinho).`);
        }

        entity.price = productExists.price * entity.quantity;
    }
}