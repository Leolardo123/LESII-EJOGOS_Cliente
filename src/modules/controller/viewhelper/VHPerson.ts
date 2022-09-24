import Gender from "@modules/models/users/Gender";
import Person from "@modules/models/users/Person";
import Phone from "@modules/models/users/Phone";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import moment from 'moment';

export class VHPerson extends VHAbstract {
    getEntity(req: Request): Person {
        const {
            ...person
        } = req.body;
        const { id } = req.params;

        const personInstance = new Person();
        if (id) {
            ensureAuthenticated(req);
            Object.assign(personInstance, { id: Number(id) });   
        }

        Object.assign(personInstance, person);
        personInstance.birth_date = moment(person.birth_date, "DD/MM/YYYY").toDate();
        if(person.gender_id){
            const genderInstance = new Gender({ id: person.gender_id });
            personInstance.gender = genderInstance;
        }
        
        if(person.phone){
            const phoneInstance = new Phone(person.phone);
            personInstance.phone = phoneInstance;
        }

        return personInstance;
    }
}