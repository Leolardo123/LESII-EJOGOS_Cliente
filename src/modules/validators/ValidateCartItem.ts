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
            throw new Error('Quantidade deve ser maior que 1 (Item do Carrinho).');
        }

        if(!entity.id){
            const daoCartItem = new DAOCartItem();
            const cartItemExists = await daoCartItem.findOne({ 
                where: { product_id: entity.product_id }
            })

            if(cartItemExists){
                throw new Error('Produto já adicionado ao carrinho')
            }

            if(!entity.product_id){
                throw new Error('Produto não encontrado (Item do Carrinho).');
            }

            const daoProduct = new DAOProduct();
            const productExists = await daoProduct.findOne({ where: { id: entity.product_id }})

            if(!productExists){
                throw new Error('Produto não encontrado (Item do Carrinho).');
            }

            if(productExists.stock < entity.quantity){
                throw new Error(`Não há quantidade suficiente em estoque (Item do Carrinho).`);
            }
        }
    }
}