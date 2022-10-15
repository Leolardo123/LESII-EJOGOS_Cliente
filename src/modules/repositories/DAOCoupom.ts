
import Coupom from "@modules/models/sales/Coupom";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOCoupom extends DAOAbstract<Coupom> {
    constructor() {
        super(Coupom);
    }
}