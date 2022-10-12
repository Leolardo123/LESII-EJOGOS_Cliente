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
        const where = entity.id ? { 
            id: entity.id 
        } : { 
            person_id: entity.person.id,
            isOpen: true,
        };
        
        const cartExists = await daoCart.findOne({ 
            where ,relations: ['items', 'person'] 
        });

        if(cartExists && !entity.id){
            if(!cartExists.isOpen || cartExists.purchase){
                throw new Error('Carrinho já foi finalizado.');
            }

            entity.id = cartExists.id;
        }

        if(!entity.id){
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
            if(cartExists.person.id != entity.person.id){
                throw new Error('Acesso negado.');
            }
        }

        if(entity.items){
            await Promise.all(entity.items.map(async newItem => {
                newItem.cart = entity;
                if(cartExists && cartExists.items){
                    const itemExists = cartExists.items.find(
                        item => item.product.id === newItem.product.id
                    )

                    if(itemExists){
                        throw new Error('Item já adicionado ao carrinho.');
                    }

                    cartExists.items.push(newItem);
                }

                await this.validateCartItem.validate(newItem);
            }))

            entity.items = cartExists ? cartExists.items : entity.items;
        }
    }
}