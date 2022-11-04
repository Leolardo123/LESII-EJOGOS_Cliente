import Address from "@modules/models/address/Address";
import { DAOAddress } from "@modules/repositories/DAOAddress";
import { IValidate } from "./IValidate";

export class ValidateAddress implements IValidate {
    async validate(entity: Address): Promise<void> {
        if (!entity.cep) {
            throw new Error('CEP é um campo obrigatório endereço.')
        }
        if (!entity.number) {
            throw new Error('Número é um campo obrigatório (Endereço).')
        }
        if (!entity.city) {
            throw new Error('Cidade é um campo obrigatório (Endereço).')
        }
        if (!entity.state) {
            throw new Error('Estado é um campo obrigatório (Endereço).')
        }
        if (!entity.country) {
            throw new Error('País é um campo obrigatório (Endereço).')
        }
        if (!entity.neighborhood) {
            throw new Error('Bairro é um campo obrigatório (Endereço).')
        }
        if (!entity.place) {
            throw new Error('Logradouro é um campo obrigatório (Endereço).')
        }
        if (!entity.address_type || !entity.address_type.id) {
            throw new Error('Tipo de Endereço é um campo obrigatório (Endereço).')
        }
        if (!entity.place_type || !entity.place_type.id) {
            throw new Error('Tipo de Lougradouro é um campo obrigatório (Endereço).')
        }

        if (entity.id) {
            const daoAddress = new DAOAddress();

            const addressExists = await daoAddress.findOne({
                where: { id: entity.id }
            });

            if (!addressExists) {
                throw new Error('Endereço não encontrado.');
            }

            if (addressExists.person[0].id !== entity.person[0].id) {
                throw new Error('Não autorizado.');
            }
        }
    }
}