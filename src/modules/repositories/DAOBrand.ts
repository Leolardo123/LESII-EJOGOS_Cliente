
import Brand from "@modules/models/cards/Brand";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOBrand extends DAOAbstract<Brand> {
    constructor() {
        super(Brand);
    }
}