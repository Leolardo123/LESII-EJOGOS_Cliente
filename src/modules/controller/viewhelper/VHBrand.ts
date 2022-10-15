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
}