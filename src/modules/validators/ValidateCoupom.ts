import Coupom from "@modules/models/sales/Coupom";
import { DAOCoupom } from "@modules/repositories/DAOCoupom";
import { IValidate } from "./IValidate";

export class ValidateCoupom implements IValidate {
    async validate(entity: Coupom): Promise<void> {
        if (!entity.id) {
            if (!entity.code)
                throw new Error('Código do cupom é um campo obrigatório.');
            if (!entity.value)
                throw new Error('Valor do cupom é um campo obrigatório.');
            if (!entity.person)
                throw new Error('Cupom deve estar vinculado a uma pessoa.');
        } else {
            const daoCoupom = new DAOCoupom();
            const coupom = await daoCoupom.findOne({
                where: {
                    id: entity.id
                },
                relations: ['person']
            });

            if (!coupom)
                throw new Error('Cupom não encontrado.');

            if (coupom.is_used)
                throw new Error('Cupom já utilizado.');

            if (coupom?.person?.id != entity?.person?.id)
                throw new Error('Cupom não é válido.');
        }
    }
}