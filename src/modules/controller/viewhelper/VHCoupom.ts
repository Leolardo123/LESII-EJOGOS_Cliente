import Coupom from "@modules/models/sales/Coupom";
import Person from "@modules/models/users/Person";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";

export class VHCoupom extends VHAbstract {
    getEntity(req: Request): Coupom {
        const {
            ...coupom
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);
        const person_id = userInfo.person ? userInfo.person : -1;

        const coupomInstance = new Coupom({ ...coupom });
        coupomInstance.person = new Person({ id: person_id });

        if (id) {
            coupomInstance.id = Number(id);
        }

        return coupomInstance;
    }
}