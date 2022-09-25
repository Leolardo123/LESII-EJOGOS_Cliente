import Cart from "../models/sales/Cart";
import { IValidate } from "./IValidate";

export class ValidateCart implements IValidate{
    constructor(){}
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
    }
}