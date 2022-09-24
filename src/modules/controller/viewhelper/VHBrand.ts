import Brand from "@modules/models/cards/Brand";
import { UserRolesEnum } from "@modules/models/users/enum/UserRolesEnum";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
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

        if(
            adminActions.includes(req.method) &&
            userInfo.role != UserRolesEnum.admin
        ){
            throw new Error('Operação não autorizada.');
        }

        const branddInstance = new Brand();
        if(id){
            Object.assign(branddInstance, { id: Number(id) });
        }
        Object.assign(branddInstance, brand);

        return branddInstance;
    }
}