import { DAOProduct } from "@modules/repositories/DAOProducts";
import CartItem from "../models/sales/CartItem";
import { IValidate } from "./IValidate";

export class ValidateCartItem implements IValidate{
    constructor(){}
    async validate(entity: CartItem): Promise<void> {
        if(!(entity instanceof CartItem)){
            throw new Error('Entidade inválida, esperava produto.');
        }

        if(!entity.id){
            if(!entity.product_id){
                throw new Error('Produto não encontrado (Carrinho).');
            }
        }

        const daoProduct = new DAOProduct();
        const productExists = await daoProduct.findOne({ where: { id: entity.product_id }})

        if(!productExists){
            throw new Error('Produto não encontrado')
        }

        if(entity.quantity< 0){
            throw new Error('Quantidade não pode ser negativa')
        }

        if(productExists.stock < entity.quantity){
            throw new Error(`Não há quantidade suficiente em estoque`)
        }
    }
}