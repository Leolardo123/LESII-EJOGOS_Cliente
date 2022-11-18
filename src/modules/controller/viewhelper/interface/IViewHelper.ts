import Domain from "@modules/models/Domain";
import { Request } from "express";
import { FindOneOptions } from "typeorm";

export interface IGetEntity {
    entity: Domain,
    whereParams: FindOneOptions,
    page?: number,
    limit?: number,
}
export interface IViewHelper {
    getEntity(req: Request): Domain;
    findEntity(req: Request): IGetEntity;
    setView(req: Request, res: any, result: any): void;
}