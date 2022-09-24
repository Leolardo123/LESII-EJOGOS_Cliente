import Card from "@modules/models/cards/Card";
import { DAOPerson } from "@modules/repositories/DAOPerson";
import { IValidate } from "./IValidate";

export class ValidateCard implements IValidate{
    constructor(
    ){}
    async validate(entity: Card): Promise<void> {
        if(!entity.id){
            if(!entity.number){
                throw new Error('Número do cartão é obrigatório (number).');
            }
            if(!entity.owner_name){
                throw new Error('Nome no cartão é obrigatório (name).');
            }
            if(!entity.brand){
                throw new Error('Bandeira é obrigatório (brand).');
            }
            if(!entity.person){
                throw new Error('Pessoa é obrigatório (person).');
            }
        }

        if(entity.number){
            if(!/\d{16}/.test(entity.number)){
                throw new Error(`O número do cartão ${entity.number} deve conter 16 dígitos.`);
            }
        }

        if(entity.owner_name){
            if(!/^[a-zA-Z ]+$/.test(entity.owner_name)){
                throw new Error(`O nome ${entity.owner_name} deve conter apenas letras.`);
            }
        }

        if(entity.person){
            const daoPerson = new DAOPerson();
            const person = await daoPerson.findOne({ 
                where: { 
                    id: entity.person.id
                }
            });

            if(!person){
                throw new Error(`Pessoa fisica não encontrada.`);
            }
        }
    }
}