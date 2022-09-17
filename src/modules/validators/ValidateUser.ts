import { DAOUser } from "@modules/repositories/DAOUser";
import User from "../models/users/User";
import { IValidate } from "./IValidate";
import { ValidatePassword } from "./ValidatePassword";
import { ValidatePerson } from "./ValidatePerson";

export class ValidateUser implements IValidate{
    constructor(
        private validatePerson: ValidatePerson,
        private validatePassword: ValidatePassword,
    ){}
    async validate(entity: User): Promise<void> {
        if(!(entity instanceof User)){
            throw new Error('Entidade inválida, esperava usuário.');
        }
        
        if(!entity.id){
            if(!entity.email){
                throw new Error('Email é um campo obrigatório (Usuário).');
            }
            if(!entity.password){
                throw new Error('Senha é um campo obrigatório (Usuário).');
            }
            if(!entity.person){
                throw new Error('Pessoa é um campo obrigatório (Usuário).');
            }
        }

        if(entity.email){
            const daoUser = new DAOUser();
            const userExists = await daoUser.findOne({ where: { email: entity.email } });
    
            if(userExists && userExists.id !== entity.id){
                throw new Error('Email já cadastrado.')
            }
        }

        if(entity.person){
            if(!this.validatePerson){
                throw new Error('Não foi possível validar dados pessoais (Usuário).')
            }
            await this.validatePerson.validate(entity.person);
        }
        if(entity.password){
            if(!this.validatePassword){
                throw new Error('Não foi possível validar senha (Usuário).')
            }
            await this.validatePassword.validate(entity);
        } else {
            throw new Error('Senha é obrigatória (Usuário).');
        }
    }
}