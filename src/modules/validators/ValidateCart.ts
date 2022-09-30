import { DAOCart } from "@modules/repositories/DAOCart";
import { IsNull } from "typeorm";
import Cart from "../models/sales/Cart";
import { IValidate } from "./IValidate";
import { ValidateCartItem } from "./ValidateCartItem";

export class ValidateCart implements IValidate{
    constructor(
        private validateCartItem: ValidateCartItem
    ){}
    async validate(entity: Cart): Promise<void> {
        if(!(entity instanceof Cart)){
            throw new Error('Entidade inválida, esperava carrinho.');
        }

        if(!entity.id){
            if(!entity.person_id){
                throw new Error('Pessoa não encontrada (Carrinho).');
            }
        }

        const daoCart = new DAOCart()
        const cartExists = await daoCart.findOne({ where: { 
            person_id: entity.person_id, 
            purchase: IsNull() as any
        }})
                
        if(cartExists){
            if(cartExists.purchase){
                throw new Error('Carrinho já finalizado')
            }
            entity.id = cartExists.id
        }

        if(entity.items){
            if(entity.items.length <= 0){
                throw new Error('Carrinho deve conter pelo menos 1 item.')
            }

            await Promise.all(entity.items.map(async cartItem => {
                const itemExists = cartExists ?
                                   cartExists.items.find(i => i.id === cartItem.id) : false

                if(itemExists){
                    cartItem.id = itemExists.id
                }

                await this.validateCartItem.validate(cartItem);
            }))
        }
    }
}