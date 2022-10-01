import { DAOAddress } from "@modules/repositories/DAOAddress";
import { DAOCart } from "@modules/repositories/DAOCart";
import { DAOProduct } from "@modules/repositories/DAOProducts";
import Purchase from "../models/sales/Purchase";
import { IValidate } from "./IValidate";

export class ValidatePurchase implements IValidate{
    constructor(){}
    async validate(entity: Purchase): Promise<void> {
        if(!(entity instanceof Purchase)){
            throw new Error('Entidade inválida, esperava item do carrinho.');
        }

        if(!entity.id){
            if(!entity.payment_address.id){
                throw new Error('Endereço de pagamento é obrigatório (Compra).');
            }
            if(!entity.delivery_address.id){
                throw new Error('Endereço de entrega é obrigatório (Compra).');
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

        const daoAddress = new DAOAddress();
        const paymentAddress = await daoAddress.findOne({
            where: {
                id: entity.payment_address.id
            }
        });
        if(!paymentAddress){
            throw new Error('Endereço de pagamento não encontrado.');
        }

        const deliveryAddress = await daoAddress.findOne({
            where: {
                id: entity.delivery_address.id
            }
        });
        if(!deliveryAddress){
            throw new Error('Endereço de entrega não encontrado.');
        }

        const daoProduct = new DAOProduct();
        cartExists.items.map(item => {
            if(!item.product){
                throw new Error('Produto não selecionado (Compra).');
            }

            const productExists = daoProduct.findOne({
                where: {
                    id: item.product.id
                }
            });

            if(!item.product){
                throw new Error('Um dos produtos não está mais disponível.');
            }

            item.product.stock -= item.quantity;
        })
    }
}