
import Address from "@modules/models/address/Address";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOAddress extends DAOAbstract {
    constructor() {
        super(Address);
    }
}