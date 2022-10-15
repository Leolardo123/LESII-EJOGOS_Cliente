import Domain from "@modules/models/Domain";
import { Request } from "express";
import { FindManyOptions } from "typeorm";

export interface IGetEntity {
    entity: Domain,
    whereParams: FindManyOptions,
}
export interface IViewHelper {
    getEntity(req: Request): Domain;
    findEntity(req: Request): IGetEntity;
    setView(req: Request, res: any, result: any): void;
}