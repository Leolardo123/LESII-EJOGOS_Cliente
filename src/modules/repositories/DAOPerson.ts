
import Person from "@modules/models/users/Person";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOPerson extends DAOAbstract<Person> {
    constructor() {
        super(Person);
    }
}