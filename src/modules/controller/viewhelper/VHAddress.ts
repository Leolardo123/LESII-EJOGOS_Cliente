import Address from "@modules/models/address/Address";
import { Request } from "express";
import { IViewHelper } from "./IViewHelper";

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
}