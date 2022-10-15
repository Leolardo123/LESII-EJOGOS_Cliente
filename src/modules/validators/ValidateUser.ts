import { DAOUser } from "@modules/repositories/DAOUser";
import User from "../models/users/User";
import { IValidate } from "./IValidate";
import { ValidatePassword } from "./ValidatePassword";
import { ValidatePerson } from "./ValidatePerson";

export class ValidateUser implements IValidate {
    constructor(
        private validatePerson: ValidatePerson,
        private validatePassword: ValidatePassword,
    ) { }
    async validate(entity: User): Promise<void> {
        if (!(entity instanceof User)) {
            throw new Error('Entidade inválida, esperava usuário.');
        }

        const daoUser = new DAOUser();
        if (!entity.id) {
            if (!entity.email) {
                throw new Error('Email é um campo obrigatório (Usuário).');
            }
            if (!entity.password) {
                throw new Error('Senha é um campo obrigatório (Usuário).');
            }
            if (!entity.person) {
                throw new Error('Pessoa é um campo obrigatório (Usuário).');
            }
        } else {
            const user = await daoUser.findOne({
                where: {
                    id: entity.id
                },
                relations: ['person']
            });

            if (!user) {
                throw new Error('Usuário não encontrado.');
            }

            if (entity.isActive !== undefined) {
                if (
                    user.role === 'admin'
                    && user.isActive === true
                    && entity.isActive === false
                ) {
                    const admins = await daoUser.findMany({
                        where: {
                            role: 'admin',
                            isActive: true
                        }
                    });
                    if (admins.length === 1) {
                        throw new Error('Não é possível desativar o último administrador.');
                    }
                }
            }
        }

        if (entity.email) {
            const userExists = await daoUser.findOne({ where: { email: entity.email } });

            if (userExists && userExists.id !== entity.id) {
                throw new Error('Email já cadastrado.')
            }
        }

        if (entity.person) {
            await this.validatePerson.validate(entity.person);
        }

        if (entity.password) {
            await this.validatePassword.validate(entity);
        }
    }
}