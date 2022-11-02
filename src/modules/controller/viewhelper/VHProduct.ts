import Product from "@modules/models/products/Product";
import ProductHistory from "@modules/models/products/ProductHistory";
import { UserRolesEnum } from "@modules/models/users/enum/UserRolesEnum";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { FindManyOptions, ILike } from "typeorm";
import { IGetEntity } from "./interface/IViewHelper";
import { VHAbstract } from "./VHAbstract";

export class VHProduct extends VHAbstract {
    getEntity(req: Request): Product {
        const {
            reason,
            ...product
        } = req.body;
        const { id } = req.params;

        const adminActions = [
            'POST',
            'PUT',
            'DELETE'
        ]

        const productInstance = new Product(product);
        if (adminActions.includes(req.method)) {
            const userInfo = ensureAuthenticated(req);
            if (userInfo.role != UserRolesEnum.admin) {
                throw new Error('Operação não autorizada.');
            }
        }

        if (id) {
            Object.assign(productInstance, { id: Number(id) });

            if (typeof product.isActive == 'boolean') {
                Object.assign(productInstance, { isActive: product.isActive });
                if (reason) {
                    const productHistory = new ProductHistory({
                        reason
                    });
                    productInstance.history = [productHistory];
                }
            }
        }

        const files = req.files as Express.Multer.File[];
        if (files && files.length > 0) {
            const [image] = files;
            productInstance.image = image.filename;
        }

        return productInstance;
    }

    findEntity(req: Request): IGetEntity {
        const { search } = req.query;
        const { id } = req.params

        let whereParams = {} as FindManyOptions<Product>;

        if (search && typeof search === 'string') {
            whereParams.where = `(name ILIKE '%${search}%'`
            if (Number(search)) {
                whereParams.where += ` OR id = '${search}')`
            } else {
                whereParams.where += ')'
            }
        }

        try {
            const userInfo = ensureAuthenticated(req);
            if (userInfo.role != UserRolesEnum.admin) {
                throw new Error();
            }
        } catch (err) {// Ignora produtos inativos caso não seja admin
            if (!whereParams.where) {
                whereParams.where = `"isActive" = true`;
            } else {
                whereParams.where += ` AND "isActive" = true`;
            }
        }

        if (id) {
            whereParams.where = `"id" = ${id}`;
        }

        return {
            entity: new Product(),
            whereParams
        }
    }
}