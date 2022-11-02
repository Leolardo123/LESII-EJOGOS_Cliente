import PlaceType from "@modules/models/address/PlaceType";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";

export class VHPlaceType extends VHAbstract {
    getEntity(req: Request): PlaceType {
        const {
            ...placeType
        } = req.body;
        const { id } = req.params;

        const placeTypeInstance = new PlaceType(placeType);

        if (id) {
            Object.assign(placeTypeInstance, { id: Number(id) });
        }

        return placeTypeInstance;
    }
}