import Person from "../models/users/Person";
import { IValidate } from "./IValidate";
import { ValidateAddress } from "./ValidateAddress";
import { ValidateCPF } from "./ValidateCPF";
import { ValidatePhone } from "./ValidatePhone";

export class ValidatePerson implements IValidate{
    constructor(
        private validateAddress: ValidateAddress,
        private validatePhone: ValidatePhone,
        private validateCPF: ValidateCPF,
    ){}
    validate(entity: Person): void {
        if(!(entity instanceof Person)){
            throw new Error('Entidade inválida, esperava pessoa.');
        }
        if(!entity.name){
            throw new Error('Nome é um campo obrigatório (Pessoa).');
        }
        if(!entity.cpf){
            throw new Error('CPF é um campo obrigatório (Pessoa).');
        } else {
            this.validateCPF.validate(entity);
        }
        if(!entity.gender){
            throw new Error('Gênero é um campo obrigatório (Pessoa).');
        }
        if(!entity.phone){
            throw new Error('Telefone é um campo obrigatório (Pessoa).');
        }
        if(entity.phone){
            this.validatePhone.validate(entity.phone);
        }
        if(entity.addresses){
            entity.addresses.map((address, index)=>{
                try {
                    this.validateAddress.validate(address);
                } catch(err: any){
                    throw new Error(`Endereço ${index+1} ${err}`)
                }  
            })
        }
    }
}