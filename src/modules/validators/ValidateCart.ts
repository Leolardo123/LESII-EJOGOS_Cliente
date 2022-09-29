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
            if(!entity.cartItems){
                throw new Error('Carrinho deve conter pelo menos 1 item.')
            }
            if(!entity.person_id){

            }
        }

        if(entity.cartItems){
            if(entity.cartItems.length <= 0){
                throw new Error('Carrinho deve conter pelo menos 1 item.')
            }

            await Promise.all(entity.cartItems.map(async cartItem => {
                await this.validateCartItem.validate(cartItem);
            }))
        }
    }
}