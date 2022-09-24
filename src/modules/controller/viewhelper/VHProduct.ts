import Product from "@modules/models/products/Product";
import { UserRolesEnum } from "@modules/models/users/enum/UserRolesEnum";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";

export class VHProduct extends VHAbstract {
    getEntity(req: Request): Product {
        const {
            ...product
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

        const productInstance = new Product();
        Object.assign(productInstance, product);

        if(id){
            Object.assign(productInstance, { id: Number(id) });
        }

        const files = req.files as Express.Multer.File[];
        if(files && files.length > 0){
            const [ image ] = files;
            productInstance.image = image.filename;
        }

        return productInstance;
    }
}