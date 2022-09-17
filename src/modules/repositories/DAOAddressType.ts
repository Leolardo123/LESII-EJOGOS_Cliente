
import AddressType from "@modules/models/address/AddressType";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOAddressType extends DAOAbstract<AddressType> {
    constructor() {
        super(AddressType);
    }
}