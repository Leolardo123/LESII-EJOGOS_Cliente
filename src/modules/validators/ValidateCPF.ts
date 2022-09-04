import Person from "../models/users/Person";
import { IValidate } from "./IValidate";

export class ValidateCPF implements IValidate{
    constructor(
    ){}
    async validate(entity: Person): Promise<void> {
        if(!entity.cpf){
            throw new Error('CPF é obrigatório (CPF).');
        }
        if(!/\d{11}/.test(entity.cpf)){
            throw new Error(`O CPF ${entity.cpf} deve conter 11 dígitos.`);
        }
    }
}