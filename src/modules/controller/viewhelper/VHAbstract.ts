import Domain from "@modules/models/Domain";
import { Request } from "express";

export interface IGetQuery{
    entity: Domain,
    where: string,
}

export abstract class VHAbstract{
    abstract getEntity(req: Request): Domain;
    setView(req: Request, res: any, result: Domain[] | Domain | string): void {
        if (typeof result === 'string') {
            res.status(201).json({ message: result });
        } else {
            res.status(201).json(result);
        }
    }
}