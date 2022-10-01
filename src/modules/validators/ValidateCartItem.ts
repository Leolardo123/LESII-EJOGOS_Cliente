import { DAOCart } from "@modules/repositories/DAOCart";
import { DAOCartItem } from "@modules/repositories/DAOCartItem";
import { DAOProduct } from "@modules/repositories/DAOProducts";
import { SimpleConsoleLogger } from "typeorm";
import CartItem from "../models/sales/CartItem";
import { IValidate } from "./IValidate";

export class ValidateCartItem implements IValidate{
    constructor(){}
    async validate(entity: CartItem): Promise<void> {
        if(!(entity instanceof CartItem)){
            throw new Error('Entidade inválida, esperava item do carrinho.');
        }

        const daoProduct = new DAOProduct();
        const productExists = await daoProduct.findOne({ 
            where: { id: entity.product.id, isActive: true }
        });

        if(!productExists){
            throw new Error('Produto não existe ou está indísponível no momento (Item do Carrinho).');
        }

        if(!entity.cart){
            throw new Error('Carrinho não encontrado (Item do Carrinho).');
        }

        const where = entity.cart.id ? { 
            id: entity.cart.id
        } : { 
            person_id: entity.cart.person.id,
            isOpen: true
        };
        
        const daoCart = new DAOCart();
        const cartExists = await daoCart.findOne({ 
            where,
            relations: ['items', 'person']
        })

        if(!cartExists){
            throw new Error('Carrinho não encontrado (Item do Carrinho).');
        }

        if(!cartExists.isOpen || cartExists.purchase){
            throw new Error('Carrinho já foi finalizado (Item do Carrinho).');
        }

        const cartItemExists = cartExists ? cartExists.items.find(
            item => item.product.id === productExists.id
        ) : undefined;
        entity.cart.id = cartExists.id;

        if(!entity.id){
            if(cartItemExists){
                entity.id = cartItemExists.id;
            }
            if(!entity.quantity){
                if(cartItemExists){
                    throw new Error('Item já adicionado ao carrinho.');
                } else {
                    entity.quantity = 1;
                }
            }
            if(!entity.product || !entity.product.id){
                throw new Error('Produto não selecionado (Item do Carrinho).');
            }
        } else {
            if(!cartItemExists){
                throw new Error('Item não encontrado.');
            }
        }

        if(entity.quantity){
            if(entity.quantity < 1){
                throw new Error('Quantidade inválida.');
            }
        }

        if(productExists.stock < entity.quantity){
            throw new Error(`Não há quantidade suficiente em estoque (Item do Carrinho).`);
        }

        entity.price = productExists.price * entity.quantity;
        entity.cart.total_price = cartExists.total_price + entity.price;
    }
}