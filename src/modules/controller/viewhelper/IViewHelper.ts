import Domain from "@modules/models/Domain";
import { Request } from "express";

export interface IViewHelper{
    getEntity(req: Request): Domain;
}