import User from "@modules/models/users/User";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOUser extends DAOAbstract {
    constructor() {
        super(User);
    }
}