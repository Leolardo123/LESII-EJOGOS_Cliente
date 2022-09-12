import Gender from "@modules/models/users/Gender";
import whereBuilder from "@shared/utils/whereBuilder";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";
import { IGetQuery} from "./interface/IViewHelper";

export class VHGender extends VHAbstract {
    getEntity(req: Request): Gender {
        const {
            name
        } = req.body;
        const { id } = req.params;

        const genderInstance = new Gender({ id: id ? Number(id) : undefined });
        Object.assign(genderInstance, { name });

        return genderInstance;
    }

    getQuery(req: Request): IGetQuery {
        const {
            ...filters
        } = req.body;
        const { id } = req.params;

        const entity = new Gender()

        const where = whereBuilder({
            parameters: [
                {
                    column: 'id',
                    value: id
                },
            ]
        })

        return { 
            entity,
            where,
        }
    }
}