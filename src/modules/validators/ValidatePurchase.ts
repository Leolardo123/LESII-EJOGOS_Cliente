import Product from "@modules/models/products/Product";
import { PurchaseStatusEnum } from "@modules/models/sales/enum/PurchaseStatus";
import { DAOAddress } from "@modules/repositories/DAOAddress";
import { DAOCard } from "@modules/repositories/DAOCard";
import { DAOCart } from "@modules/repositories/DAOCart";
import { DAOProduct } from "@modules/repositories/DAOProducts";
import { DAOPurchase } from "@modules/repositories/DAOPurchase";
import Purchase from "../models/sales/Purchase";
import { IValidate } from "./IValidate";
import { ValidateAddress } from "./ValidateAddress";
import { ValidateCard } from "./ValidateCard";
import { ValidateCart } from "./ValidateCart";
import { ValidateProduct } from "./ValidateProduct";

export class ValidatePurchase implements IValidate{
    constructor(
        private validateCart: ValidateCart,
        private validateAddress: ValidateAddress,
        private validateProduct: ValidateProduct
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

            if(!entity.payment_address || !entity.payment_address.id){
                throw new Error('Endereço de pagamento não selecionado.');
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
                entity.payment_address = paymentAddress;
            } else {
                await this.validateAddress.validate(entity.payment_address);
            }

            if(!entity.delivery_address || !entity.delivery_address.id){
                throw new Error('Endereço de entrega não selecionado.');
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
                entity.delivery_address = deliveryAddress;
            } else {
                await this.validateAddress.validate(entity.delivery_address);
            }

            if(!entity.cards || entity.cards.length <= 0){
                throw new Error('Cartão não selecionado.');
            }

            if(entity.cards){
                const daoCard = new DAOCard();
                await Promise.all(entity.cards.map(async card => {
                    const cardExists = await daoCard.findOne({
                        where: { id: card.id }
                    })
                    if(!cardExists){
                        throw new Error('Um dos cartões selecionados não está disponível');
                    }
                }));
            }

            if(cartExists.items.length <= 0){
                throw new Error('Nenhum produto selecionado')
            }

            await Promise.all(
                cartExists.items.map(async (item)=>{
                    item.product.stock -= item.quantity
                    await this.validateProduct.validate(item.product);
                })
            )

            entity.cart = cartExists;
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

            if(entity.status){
                if(PurchaseStatusEnum){
                    if(
                        !Object.values(PurchaseStatusEnum)
                        .includes(entity.status as PurchaseStatusEnum)
                    ){
                        throw new Error('Estado de compra selecionado não é válido.');
                    }
                }
            }
        }
    }
}