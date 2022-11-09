import Person from "../models/users/Person";
import { IValidate } from "./IValidate";

export class ValidateCPF implements IValidate {
    constructor(
    ) { }
    async validate(entity: Person): Promise<void> {
        if (!entity.cpf) {
            throw new Error('CPF é obrigatório (CPF).');
        }

        //(000.000.000-00)
        if (!/\d{3}\.\d{3}\.\d{3}\-\d{2}/.test(entity.cpf)) {
            throw new Error(`O CPF ${entity.cpf} não é válido.`);
        }
    }
}