import User from "@modules/models/users/User";
import whereBuilder from "@shared/utils/whereBuilder";
import { Request } from "express";
import { IGetQuery, IViewHelper } from "./IViewHelper";

export class VHAuth implements IViewHelper {
    getEntity(req: Request): User {
        const {
            email,
            password
        } = req.body;
        const { id } = req.params;

        const userInstance = new User({ id: id ? Number(id) : undefined });
        Object.assign(userInstance, {
            email,
            password
        });

        return userInstance;
    }

    getQuery(req: Request): IGetQuery {
        const {
            email,
            password
        } = req.body;

        const entity = new User({email, password})

        const where = whereBuilder({
            parameters: [
                {
                    column: 'email',
                    value: email
                },
            ]
        })

        return { 
            entity,
            where,
        }
    }
}