import User from "@modules/models/users/User";
import { IValidate } from "./IValidate";

export class ValidatePassword implements IValidate{
    constructor(
    ){}
    async validate(entity: User): Promise<void> {
        if (!entity.password.match(/[A-Z]/)) {
            throw new Error('"Senha" deve conter ao menos uma letra maiúscula');
        }
        if (!entity.password.match(/[a-z]/)) {
            throw new Error('"Senha" deve conter ao menos uma letra minúscula');
        }
        if (!entity.password.match(/[\d]/)) {
            throw new Error('"Senha" deve conter ao menos um número');
        }
        if (!entity.password.match(/[^\w\d]/)) {
            throw new Error('"Senha" deve conter ao menos um caractere especial');
        }
        if (entity.password.length < 8) {
            throw new Error('"Senha" deve conter ao menos 8 dígitos');
        }
    }
}