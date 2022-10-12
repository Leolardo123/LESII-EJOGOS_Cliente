import Product from "@modules/models/products/Product";
import { DAOAddress } from "@modules/repositories/DAOAddress";
import { DAOCart } from "@modules/repositories/DAOCart";
import { DAOProduct } from "@modules/repositories/DAOProducts";
import { DAOPurchase } from "@modules/repositories/DAOPurchase";
import Purchase from "../models/sales/Purchase";
import { IValidate } from "./IValidate";
import { ValidateAddress } from "./ValidateAddress";
import { ValidateCard } from "./ValidateCard";
import { ValidateCart } from "./ValidateCart";

export class ValidatePurchase implements IValidate{
    constructor(
        private validateCart: ValidateCart,
        private validateAddress: ValidateAddress,
        private validateCard: ValidateCard
    ){}
    async validate(entity: Purchase): Promise<void> {
        if(!(entity instanceof Purchase)){
            throw new Error('Entidade inválida, esperava item do carrinho.');
        }

        const daoAddress = new DAOAddress();
        if(!entity.id){
            if(!entity.cart){
                throw new Error('Carrinho não encontrado.');
            }

            const daoCart = new DAOCart();
            const cartExists = await daoCart.findOne({
                where: { id: entity.cart.id },
            });
    
            if(!cartExists){
                throw new Error('Carrinho não encontrado.');
            }

            await this.validateCart.validate(entity.cart);
    
            if(!entity.cart.person || !entity.cart.person.id){
                throw new Error('Pessoa não encontrada (Compra).');
            }

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

            if(!entity.cards || entity.cards.length <= 0){
                throw new Error('Cartão não selecionado.');
            }

            if(entity.cards){
                await Promise.all(entity.cards.map(async card => {
                    await this.validateCard.validate(card);
                }));
            }

            cartExists.items.map((item)=>{
                item.product.stock -= item.quantity
            })

            entity.total_price = cartExists.getTotalPrice();
            entity.cart.isOpen = false;
        } 
        
        if(entity.id){
            const daoPurchase = new DAOPurchase();
            const purchaseExists = await daoPurchase.findOne({
                where: { id: entity.id },
            });
    
            if(!purchaseExists){
                throw new Error('Compra não encontrada.');
            }
        }
    }
}