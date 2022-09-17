
import PlaceType from "@modules/models/address/PlaceType";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOPlaceType extends DAOAbstract {
    constructor() {
        super(PlaceType);
    }
}