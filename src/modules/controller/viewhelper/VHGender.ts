import Gender from "@modules/models/users/Gender";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";

export class VHGender extends VHAbstract {
    getEntity(req: Request): Gender {
        const {
            ...gender
        } = req.body;
        const { id } = req.params;

        const genderInstance = new Gender();

        if(id){
            Object.assign(genderInstance, { id });
        }
        Object.assign(genderInstance, gender);

        return genderInstance;
    }
}