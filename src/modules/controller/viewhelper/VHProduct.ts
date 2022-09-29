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


        const adminActions = [
            'POST',
            'PUT',
            'DELETE'
        ]

        const productInstance = new Product();
        Object.assign(productInstance, product);

        if(adminActions.includes(req.method)){
            const userInfo = ensureAuthenticated(req);
            if(userInfo.role != UserRolesEnum.admin){
                throw new Error('Operação não autorizada.');
            }
        }

        if(req.method == 'GET'){
            try{
                const userInfo = ensureAuthenticated(req);
                if(userInfo.role != UserRolesEnum.admin){
                    throw new Error();
                }
            } catch(err){
                productInstance.isActive = true
            }
        }

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