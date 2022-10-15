import Card from "@modules/models/cards/Card";
import { DAOCard } from "@modules/repositories/DAOCard";
import { DAOPerson } from "@modules/repositories/DAOPerson";
import { IValidate } from "./IValidate";

export class ValidateCard implements IValidate {
    constructor(
    ) { }
    async validate(entity: Card): Promise<void> {
        if (!entity.id) {
            if (!entity.number) {
                throw new Error('Número do cartão é obrigatório (number).');
            }
            if (!entity.owner_name) {
                throw new Error('Nome no cartão é obrigatório (name).');
            }
            if (!entity.brand) {
                throw new Error('Bandeira é obrigatório (brand).');
            }
            if (!entity.person) {
                throw new Error('Pessoa é obrigatório (person).');
            }
        } else {
            const daoCard = new DAOCard();

            const card = await daoCard.findOne({
                where: {
                    id: entity.id
                },
                relations: ['person']
            });

            if (!card) {
                throw new Error('Cartão não encontrado.');
            }

            if (card.person.id != entity.person.id) {
                throw new Error('Cartão não é válido.');
            }
        }

        if (entity.number) {
            if (!/\d{16}/.test(entity.number)) {
                throw new Error(`O número do cartão ${entity.number} deve conter 16 dígitos.`);
            }
        }

        if (entity.owner_name) {
            if (!/^[a-zA-Z ]+$/.test(entity.owner_name)) {
                throw new Error(`O nome ${entity.owner_name} deve conter apenas letras.`);
            }
        }
    }
}