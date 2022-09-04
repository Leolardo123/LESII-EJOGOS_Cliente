import Gender from "@modules/models/users/Gender";
import { IValidate } from "./IValidate";

export class ValidateGender implements IValidate{
    constructor(
    ){}
    validate(entity: Gender): void {
        if(!entity.name){
            throw new Error('Nome é um campo obrigatório (Gênero).');
        }
    }
}