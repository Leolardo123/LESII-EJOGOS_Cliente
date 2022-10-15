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

        return {
            entity: new Product(),
            whereParams
        }
    }

    setView(req: Request, res: any, result: Product[] | Product | string): void {
        if (typeof result === 'string') {
            res.status(201).json({ message: result });
        } else {
            if (result instanceof Array) {
                res.status(201).json(result.map((product: Product) => {
                    return {
                        ...product,
                        image_url:
                            product.image ?
                                `${process.env.APP_API_URL}/files/${product.image}` :
                                `${process.env.APP_API_URL}/files/default.png`
                    };
                }));
            } else {
                res.status(201).json({
                    ...result,
                    image_url:
                        result.image ?
                            `${process.env.APP_API_URL}/files/${result.image}` :
                            `${process.env.APP_API_URL}/files/default.png`
                });
            }
        }
    }
}