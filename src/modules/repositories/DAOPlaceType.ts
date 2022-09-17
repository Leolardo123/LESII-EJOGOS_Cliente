
import PlaceType from "@modules/models/address/PlaceType";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOPlaceType extends DAOAbstract<PlaceType> {
    constructor() {
        super(PlaceType);
    }
}