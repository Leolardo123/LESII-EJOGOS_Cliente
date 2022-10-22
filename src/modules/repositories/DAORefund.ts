
import Refund from "@modules/models/sales/Refund";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAORefund extends DAOAbstract<Refund> {
    constructor() {
        super(Refund);
    }
}