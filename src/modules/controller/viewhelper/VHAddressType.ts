import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import whereBuilder from "@shared/utils/whereBuilder";
import { Request } from "express";
import { IGetQuery, IViewHelper } from "./IViewHelper";

export class VHAddressType implements IViewHelper {
    getEntity(req: Request): AddressType {
        const {
            name
        } = req.body;
        const { id } = req.params;

        const placeTypeInstance = new AddressType({ id: id ? Number(id) : undefined });
        Object.assign(placeTypeInstance, { name });

        return placeTypeInstance;
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