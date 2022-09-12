import PlaceType from "@modules/models/address/PlaceType";
import whereBuilder from "@shared/utils/whereBuilder";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";
import { IGetQuery } from "./interface/IViewHelper";

export class VHPlaceType extends VHAbstract {
    getEntity(req: Request): PlaceType {
        const {
            name
        } = req.body;
        const { id } = req.params;

        const placeTypeInstance = new PlaceType({ id: id ? Number(id) : undefined });
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