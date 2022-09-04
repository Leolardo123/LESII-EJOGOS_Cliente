import AddressType from "@modules/models/address/AddressType";
import { Request } from "express";
import { IViewHelper } from "./IViewHelper";

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
}