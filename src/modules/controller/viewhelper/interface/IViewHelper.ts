import Domain from "@modules/models/Domain";
import { Request } from "express";

export interface IGetQuery{
    entity: Domain,
    where: string,
}
export interface IViewHelper{
    getEntity(req: Request): Domain;
    setView(req: Request, res: any, result: any): void;
}