import User from "../models/users/User";
import { IValidate } from "./IValidate";
import { ValidatePerson } from "./ValidatePerson";

export class ValidateUser implements IValidate{
    constructor(
        private validatePerson: ValidatePerson
    ){}
    validate(entity: User): void {
        if(!(entity instanceof User)){
            throw new Error('Entidade inválida, esperava usuário (Usuário).');
        }
        if(!entity.email){
            throw new Error('Email é um campo obrigatório (Usuário).');
        }
        if(entity.person){
            if(!this.validatePerson){
                throw new Error('Não foi possível validar dados pessoais (Usuário).')
            }
            this.validatePerson.validate(entity.person);
        }
    }
}