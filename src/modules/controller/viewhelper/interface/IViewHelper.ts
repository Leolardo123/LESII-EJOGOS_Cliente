import Domain from "@modules/models/Domain";
import { Request } from "express";

export interface IGetEntity{
    entity: Domain,
    relations: string[]
}
export interface IViewHelper{
    getEntity(req: Request): Domain;
    findEntity(req: Request): IGetEntity;
    setView(req: Request, res: any, result: any): void;
}