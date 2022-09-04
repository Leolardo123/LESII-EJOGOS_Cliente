import Phone from "../models/users/Phone";
import { IValidate } from "./IValidate";

export class ValidatePhone implements IValidate{
    async validate(entity: Phone): Promise<void> {
        if(!(entity instanceof Phone)){
            throw new Error('Entidade inválida, esperava telefone.');
        }
        if(!entity.ddd){
            throw new Error('DDD é um campo obrigatório (Telefone).');
        }
        if(!entity.number){
            throw new Error('Número é um campo obrigatório (Telefone).');
        }
    }
}