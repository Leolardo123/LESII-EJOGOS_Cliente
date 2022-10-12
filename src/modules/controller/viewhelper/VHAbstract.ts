import Domain from "@modules/models/Domain";
import { Request } from "express";
import { IGetEntity } from "./interface/IViewHelper";

export abstract class VHAbstract{
    abstract getEntity(req: Request): Domain;
    findEntity(req: Request):IGetEntity {
        return {
            entity: this.getEntity(req),
            relations: []
        }
    }
    setView(req: Request, res: any, result: Domain[] | Domain | string): void {
        if (typeof result === 'string') {
            res.status(201).json({ message: result });
        } else {
            res.status(201).json(result);
        }
    }
}