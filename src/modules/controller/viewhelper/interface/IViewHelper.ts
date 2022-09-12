import Domain from "@modules/models/Domain";
import { Request } from "express";

export interface IGetQuery{
    entity: Domain,
    where: string,
}
export interface IViewHelper{
    getEntity(req: Request): Domain;
    getQuery(req: Request): IGetQuery;
    setView(req: Request, res: any, result: any): void;
}