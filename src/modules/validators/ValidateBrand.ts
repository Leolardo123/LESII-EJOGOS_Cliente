import Brand from "@modules/models/cards/Brand";
import { DAOPerson } from "@modules/repositories/DAOPerson";
import { IValidate } from "./IValidate";

export class ValidateBrand implements IValidate{
    constructor(
    ){}
    async validate(entity: Brand): Promise<void> {
        if(!entity.id){
            if(!entity.name){
                throw new Error('Nome é obrigatório (Bandeira).');
            }
            if(!entity.image){
                throw new Error('Imagem é obrigatória (Bandeira).');
            }
        }
    }
}