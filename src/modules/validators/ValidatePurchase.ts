import { DAOAddress } from "@modules/repositories/DAOAddress";
import { DAOCart } from "@modules/repositories/DAOCart";
import { DAOProduct } from "@modules/repositories/DAOProducts";
import Purchase from "../models/sales/Purchase";
import { IValidate } from "./IValidate";
import { ValidateAddress } from "./ValidateAddress";
import { ValidateCart } from "./ValidateCart";

export class ValidatePurchase implements IValidate{
    constructor(
        private validateCart: ValidateCart,
        private validateAddress:ValidateAddress
    ){}
    async validate(entity: Purchase): Promise<void> {
        if(!(entity instanceof Purchase)){
            throw new Error('Entidade inválida, esperava item do carrinho.');
        }

        const daoAddress = new DAOAddress();
        if(!entity.id){
            if(entity.payment_address.id){
                const paymentAddress = await daoAddress.findOne({
                    where: {
                        id: entity.payment_address.id
                    }
                });
                if(!paymentAddress){
                    throw new Error('Endereço de pagamento não encontrado.');
                }
            } else {
                await this.validateAddress.validate(entity.payment_address);
            }
    
            if(entity.delivery_address.id){
                const deliveryAddress = await daoAddress.findOne({
                    where: {
                        id: entity.delivery_address.id
                    }
                });
                if(!deliveryAddress){
                    throw new Error('Endereço de entrega não encontrado.');
                }
            } else {
                await this.validateAddress.validate(entity.delivery_address);
            }
        }
        
        if(!entity.cart){
            throw new Error('Carrinho não encontrado.');
        }

        if(!entity.cart.person || !entity.cart.person.id){
            throw new Error('Pessoa não encontrada (Compra).');
        }

        if(!entity.cards || !entity.cards.length || !entity.cards[0].id){
            throw new Error('Cartão não encontrado.');
        }

        const daoCart = new DAOCart();
        const cartExists = await daoCart.findOne({
            where: { id: entity.cart.id },
        });

        if(!cartExists){
            throw new Error('Carrinho não encontrado.');
        }

        await this.validateCart.validate(entity.cart);
    }
}