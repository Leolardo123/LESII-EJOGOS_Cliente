import Address from "@modules/models/address/Address";
import whereBuilder from "@shared/utils/whereBuilder";
import { Request } from "express";
import { IGetQuery, IViewHelper } from "./IViewHelper";

export class VHAddress implements IViewHelper {
    getEntity(req: Request): Address {
        const {
            ...address
        } = req.body;
        const { id } = req.params;

        const addressInstance = new Address({ id: id ? Number(id) : undefined });
        Object.assign(addressInstance, address);

        return addressInstance;
    }

    getQuery(req: Request): IGetQuery {
        const {
            ...filters
        } = req.body;
        const { id } = req.params;

        const entity = new Address()

        const where = whereBuilder({
            parameters: [
                {
                    column: 'id',
                    value: id
                },
            ]
        })

        return { 
            entity,
            where,
        }
    }
}