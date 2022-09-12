import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import whereBuilder from "@shared/utils/whereBuilder";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";
import { IGetQuery, IViewHelper } from "./interface/IViewHelper";

export class VHAddressType extends VHAbstract {
    getEntity(req: Request): AddressType {
        const {
            name
        } = req.body;
        const { id } = req.params;

        const addressTypeInstance = new AddressType({ id: id ? Number(id) : undefined });
        Object.assign(addressTypeInstance, { name });

        return addressTypeInstance;
    }

    getQuery(req: Request): IGetQuery {
        const {
            ...filters
        } = req.body;
        const { id } = req.params;

        const entity = new PlaceType()

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