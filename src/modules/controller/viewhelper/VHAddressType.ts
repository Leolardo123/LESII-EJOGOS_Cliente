import AddressType from "@modules/models/address/AddressType";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";

export class VHAddressType extends VHAbstract {
    getEntity(req: Request): AddressType {
        const {
            ...addressType
        } = req.body;
        const { id } = req.params;

        const addressTypeInstance = new AddressType(addressType);
        if(id){
            Object.assign(addressTypeInstance, { id: Number(id) });
        }

        return addressTypeInstance;
    }
}