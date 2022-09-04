import PlaceType from "@modules/models/address/PlaceType";
import { Request } from "express";
import { IViewHelper } from "./IViewHelper";

export class VHPlaceType implements IViewHelper {
    getEntity(req: Request): PlaceType {
        const {
            name
        } = req.body;
        const { id } = req.params;

        const placeTypeInstance = new PlaceType({ id: id ? Number(id) : undefined });
        Object.assign(placeTypeInstance, { name });

        return placeTypeInstance;
    }
}