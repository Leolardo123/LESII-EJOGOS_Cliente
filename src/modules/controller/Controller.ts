
import { IFacade } from "@modules/facade/IFacade";
import AppError from "@shared/errors/AppError";
import IHash from "@shared/interfaces/IHash";
import { Request, Response } from "express";
import { IViewHelper } from "./viewhelper/IViewHelper";
import { VHAddress } from "./viewhelper/VHAddress";
import { VHAddressType } from "./viewhelper/VHAddressType";
import { VHGender } from "./viewhelper/VHGender";
import { VHPlaceType } from "./viewhelper/VHPlaceType";
import { VHUser } from "./viewhelper/VHUser";
class Controller{
    private vhs: IHash<IViewHelper> = {};
    constructor(private facade: IFacade){
        this.vhs.users = new VHUser();
        this.vhs.address = new VHAddress();
        this.vhs.addresstype = new VHAddressType();
        this.vhs.gender = new VHGender();
        this.vhs.placetype = new VHPlaceType();
    }

     create = async (req: Request, res: Response) => {
        const { route } = req.params

        if(!this.vhs[route]){
            throw new Error(`${route} não existe.`)
        }

        const entity = this.vhs[route].getEntity(req);
        const msg = await this.facade.create(entity);

        return res.json({ msg })
    }

    update = async (req: Request, res: Response) => {
        const { route } = req.params

        if(!this.vhs[route]){
            throw new Error(`${route} não existe.`)
        }
        
        const entity = this.vhs[route].getEntity(req);
        const msg = await this.facade.update(entity);

        return res.json({ msg })
    }

    delete = async (req: Request, res: Response) => {
        const { route } = req.params

        if(!this.vhs[route]){
            throw new Error(`${route} não existe.`)
        }
        
        const entity = this.vhs[route].getEntity(req);
        const msg = await this.facade.delete(entity);

        return res.json({ msg })
    }

    get = async (req: Request, res: Response) => {
        const { route } = req.params

        if(!this.vhs[route]){
            throw new Error(`${route} não existe.`)
        }
        
        const entity = this.vhs[route].getEntity(req);
        const msg = await this.facade.query(entity);

        return res.json({ msg })
    }
}

export { Controller }