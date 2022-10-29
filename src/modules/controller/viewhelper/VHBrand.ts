import Brand from "@modules/models/cards/Brand";
import { UserRolesEnum } from "@modules/models/users/enum/UserRolesEnum";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { FindManyOptions, ILike } from "typeorm";
import { IGetEntity } from "./interface/IViewHelper";
import { VHAbstract } from "./VHAbstract";

export class VHBrand extends VHAbstract {
    getEntity(req: Request): Brand {
        const {
            ...brand
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);
        const adminActions = [
            'POST',
            'PUT',
            'DELETE'
        ]

        if (
            adminActions.includes(req.method) &&
            userInfo.role != UserRolesEnum.admin
        ) {
            throw new Error('Operação não autorizada.');
        }

        const branddInstance = new Brand();
        if (id) {
            Object.assign(branddInstance, { id: Number(id) });
        }
        Object.assign(branddInstance, brand);

        const files = req.files as Express.Multer.File[];
        if (files && files.length > 0) {
            const [image] = files;
            branddInstance.image = image.filename;
        }


        return branddInstance;
    }

    findEntity(req: Request): IGetEntity {
        const { search } = req.query;

        const entity = new Brand();
        let whereParams = {} as FindManyOptions<Brand>;

        if (search) {
            whereParams.where = {
                name: ILike(`%${search}%`)
            }
        }

        return {
            entity,
            whereParams
        }
    }

    setView(req: Request, res: any, result: Brand[] | Brand | string): void {
        if (typeof result === 'string') {
            res.status(201).json({ message: result });
        } else {
            if (result instanceof Array) {
                res.status(201).json(result.map((brand: Brand) => {
                    return {
                        ...brand,
                        image_url:
                            brand.image ?
                                `${process.env.APP_API_URL}/files/${brand.image}` :
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