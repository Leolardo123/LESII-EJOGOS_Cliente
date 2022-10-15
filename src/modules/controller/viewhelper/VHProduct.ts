import Product from "@modules/models/products/Product";
import { UserRolesEnum } from "@modules/models/users/enum/UserRolesEnum";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { FindManyOptions, ILike } from "typeorm";
import { IGetEntity } from "./interface/IViewHelper";
import { VHAbstract } from "./VHAbstract";

export class VHProduct extends VHAbstract {
    getEntity(req: Request): Product {
        const {
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

        if (req.method == 'GET') {
            try {
                const userInfo = ensureAuthenticated(req);
                if (userInfo.role != UserRolesEnum.admin) {
                    throw new Error();
                }
            } catch (err) {
                productInstance.isActive = true
            }
        }

        if (id) {
            Object.assign(productInstance, { id: Number(id) });
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

        const whereParams = {} as FindManyOptions<Product>;
        if (search) {
            whereParams.where = {
                name: ILike(`%${search}%`)
            }
        }

        return {
            entity: this.getEntity(req),
            whereParams
        }
    }
}