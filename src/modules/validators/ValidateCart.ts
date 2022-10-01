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

        const daoCart = new DAOCart();
        console.log(entity)
        const where = entity.id ? { 
            id: entity.id 
        } : { 
            person_id: entity.person.id,
            isOpen: true
        };

        const cartExists = await daoCart.findOne({ where });

        if(!entity.id){
            if(cartExists){
                throw new Error('Já existe um carrinho ativo.');
            }

            if(!entity.person || !entity.person.id){
                throw new Error('Pessoa não encontrada (Carrinho).');
            }
        } else {
            if(!cartExists){
                throw new Error('Carrinho não encontrado.');
            }
            if(!cartExists.isOpen || cartExists.purchase){
                throw new Error('Carrinho já foi finalizado.');
            }
            if(cartExists.person_id != entity.person.id){
                throw new Error('Acesso negado.');
            }
        }
                
        if(cartExists){
            if(cartExists.purchase){
                throw new Error('Carrinho já finalizado')
            }
        }

        entity.total_price = 0;
        if(entity.items){
            await Promise.all(entity.items.map(async cartItem => {
                cartItem.cart = entity;
                if(cartExists && cartExists.items){
                    const itemExists = cartExists.items.find(
                        item => item.product.id === cartItem.product.id
                    )
                    if(itemExists){
                        cartItem.id = itemExists.id
                    }
                }

                await this.validateCartItem.validate(cartItem);
                entity.total_price += cartItem.price
            }))
        }
    }
}