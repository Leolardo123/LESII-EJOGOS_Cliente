import AddressType from "@modules/models/address/AddressType";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";

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
}