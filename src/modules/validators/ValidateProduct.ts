import ProductHistory from "@modules/models/products/ProductHistory";
import { DAOProductHistory } from "@modules/repositories/DAOProductHistory";
import Product from "../models/products/Product";
import { IValidate } from "./IValidate";

export class ValidateProduct implements IValidate {
    constructor() { }
    async validate(entity: Product): Promise<void> {
        if (!(entity instanceof Product)) {
            throw new Error('Entidade inválida, esperava produto.');
        }

        if (!entity.id) {
            if (!entity.name) {
                throw new Error('Nome é um campo obrigatório (Produto).');
            }
            if (!entity.price) {
                throw new Error('Preço é um campo obrigatório (Produto).');
            }
            if (!entity.description) {
                throw new Error('Descrição é um campo obrigatório (Produto).');
            }
            if (!entity.developer) {
                throw new Error('Desenvolvedor é um campo obrigatório (Produto).');
            }
            if (!entity.publisher) {
                throw new Error('Publicadora é um campo obrigatório (Produto).');
            }
            if (!entity.release_date) {
                throw new Error('Data de lançamento é um campo obrigatório (Produto).');
            }
            if (!entity.image) {
                throw new Error('Imagem é um campo obrigatório (Produto).');
            }
            if (!entity.requirements) {
                throw new Error('Requisitos é um campo obrigatório (Produto).');
            }
            if (!entity.language) {
                throw new Error('Idioma é um campo obrigatório (Produto).');
            }
        }

        if (entity.id) {
            if (typeof entity.isActive === 'boolean') {
                const reasonExists = entity.history.find((history) => !history.id && history.reason);

                if (!reasonExists) {
                    throw new Error(`Dê um motivo para a ${entity.isActive ? 'ativação' : 'inativação'} do produto.`);
                }

                reasonExists.action = entity.isActive ? 'Ativação' : 'Inativação';

                const daoProductHistory = new DAOProductHistory();
                const historyExists = await daoProductHistory.findMany({
                    where: {
                        product: entity.id,
                    },
                });

                historyExists.push(reasonExists);
                entity.history = historyExists;
            }
        }

        if (entity.isActive === true) {
            if (entity.stock <= 0) {
                throw new Error('Estoque deve ser maior que zero.');
            }
        }

        if (entity.stock < 0) {
            throw new Error('Estoque insuficiente')
        }

        if (entity.stock == 0) {
            const daoProductHistory = new DAOProductHistory();

            const historyExists = await daoProductHistory.findMany({
                where: {
                    product: entity.id,
                },
            });

            entity.isActive = false;
            const productHistory = new ProductHistory({
                action: 'Auto-desativado',
                reason: 'FORA DE MERCADO',
            });

            historyExists.push(productHistory);
            entity.history = historyExists;
        }

        if (entity.price < 0) {
            throw new Error('Preço não pode ser negativo')
        }
    }
}