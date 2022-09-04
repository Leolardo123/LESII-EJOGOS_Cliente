import Gender from "@modules/models/users/Gender";
import { Request } from "express";
import { IViewHelper } from "./IViewHelper";

export class VHGender implements IViewHelper {
    getEntity(req: Request): Gender {
        const {
            name
        } = req.body;
        const { id } = req.params;

        const genderInstance = new Gender({ id: id ? Number(id) : undefined });
        Object.assign(genderInstance, { name });

        return genderInstance;
    }
}