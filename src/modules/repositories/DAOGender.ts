import Gender from "@modules/models/users/Gender";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOGender extends DAOAbstract<Gender> {
    constructor() {
        super(Gender);
    }
}