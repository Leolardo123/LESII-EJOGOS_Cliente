
import { IFacade } from "@modules/facade/IFacade";
import IHash from "@shared/interfaces/IHash";
import { Request, Response } from "express";
import { IViewHelper } from "./viewhelper/interface/IViewHelper";
import { VHAddress } from "./viewhelper/VHAddress";
import { VHAddressType } from "./viewhelper/VHAddressType";
import { VHGender } from "./viewhelper/VHGender";
import { VHPlaceType } from "./viewhelper/VHPlaceType";
import { VHUser } from "./viewhelper/VHUser";
class Controller{
    private vhs: IHash<IViewHelper> = {};
    constructor(private facade: IFacade){
       this.vhs = {
            "users": new VHUser(),
            "addresses": new VHAddress(),
            "addresses-types": new VHAddressType(),
            "genders": new VHGender(),
            "places-types": new VHPlaceType(),
       }
    }

     create = async (req: Request, res: Response) => {
        const { route } = req.params

        if(!this.vhs[route]){
            throw new Error(`${route} não existe.`)
        }

        const entity = this.vhs[route].getEntity(req);
        const msg = await this.facade.create(entity);

        return this.vhs[route].setView(req, res, msg);
    }

    update = async (req: Request, res: Response) => {
        const { route } = req.params

        if(!this.vhs[route]){
            throw new Error(`${route} não existe.`)
        }
        
        const entity = this.vhs[route].getEntity(req);
        const msg = await this.facade.update(entity);

        return this.vhs[route].setView(req, res, msg);
    }

    delete = async (req: Request, res: Response) => {
        const { route } = req.params

        if(!this.vhs[route]){
            throw new Error(`${route} não existe.`)
        }
        
        const entity = this.vhs[route].getEntity(req);
        const msg = await this.facade.delete(entity);

        return this.vhs[route].setView(req, res, msg);
    }

    get = async (req: Request, res: Response) => {
        const { route } = req.params

        if(!this.vhs[route]){
            throw new Error(`${route} não existe.`)
        }
        
        const { entity, where } = this.vhs[route].getQuery(req);
        const result = await this.facade.query(entity, where);

        return this.vhs[route].setView(req, res, result);
    }
}

export { Controller }