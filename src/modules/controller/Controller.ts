
import { IFacade } from "@modules/facade/IFacade";
import { DAOProduct } from "@modules/repositories/DAOProducts";
import IHash from "@shared/interfaces/IHash";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request, Response } from "express";
import { IViewHelper } from "./viewhelper/interface/IViewHelper";
import { VHAddress } from "./viewhelper/VHAddress";
import { VHAddressType } from "./viewhelper/VHAddressType";
import { VHBrand } from "./viewhelper/VHBrand";
import { VHCard } from "./viewhelper/VHCard";
import { VHCart } from "./viewhelper/VHCart";
import { VHCartItem } from "./viewhelper/VHCartItem";
import { VHGender } from "./viewhelper/VHGender";
import { VHPerson } from "./viewhelper/VHPerson";
import { VHPlaceType } from "./viewhelper/VHPlaceType";
import { VHProduct } from "./viewhelper/VHProduct";
import { VHPurchase } from "./viewhelper/VHPurchase";
import { VHRefund } from "./viewhelper/VHRefund";
import { VHUser } from "./viewhelper/VHUser";
class Controller {
    private vhs: IHash<IViewHelper> = {};
    constructor(private facade: IFacade) {
        this.vhs = {
            "users": new VHUser(),
            "persons": new VHPerson(),
            "addresses": new VHAddress(),
            "addresses-types": new VHAddressType(),
            "genders": new VHGender(),
            "places-types": new VHPlaceType(),
            "brands": new VHBrand(),
            "cards": new VHCard(),
            "products": new VHProduct(),
            "carts": new VHCart(),
            "cart-items": new VHCartItem(),
            "purchases": new VHPurchase(),
            "refunds": new VHRefund(),
        }
    }

    create = async (req: Request, res: Response) => {
        const { route } = req.params

        if (!this.vhs[route]) {
            throw new Error(`${route} não existe.`)
        }

        const entity = this.vhs[route].getEntity(req);
        const msg = await this.facade.create(entity);

        return this.vhs[route].setView(req, res, msg);
    }

    update = async (req: Request, res: Response) => {
        const { route } = req.params

        if (!this.vhs[route]) {
            throw new Error(`${route} não existe.`)
        }

        const entity = this.vhs[route].getEntity(req);
        const msg = await this.facade.update(entity);

        return this.vhs[route].setView(req, res, msg);
    }

    delete = async (req: Request, res: Response) => {
        const { route } = req.params

        if (!this.vhs[route]) {
            throw new Error(`${route} não existe.`)
        }

        const entity = this.vhs[route].getEntity(req);
        const msg = await this.facade.delete(entity);

        return this.vhs[route].setView(req, res, msg);
    }

    get = async (req: Request, res: Response) => {
        const { route } = req.params

        if (!this.vhs[route]) {
            throw new Error(`${route} não existe.`)
        }

        const { entity, whereParams } = this.vhs[route].findEntity(req);
        const result = await this.facade.findOne(entity, whereParams);

        return this.vhs[route].setView(req, res, result);
    }

    index = async (req: Request, res: Response) => {
        const { route } = req.params

        if (!this.vhs[route]) {
            throw new Error(`${route} não existe.`)
        }

        const { entity, whereParams } = this.vhs[route].findEntity(req);
        const result = await this.facade.findMany(entity, whereParams);

        return this.vhs[route].setView(req, res, result);
    }

    dashboard = async (req: Request, res: Response) => {
        const userInfo = ensureAuthenticated(req);

        if (userInfo.role !== 'admin') {
            throw new Error('Você não tem permissão para acessar essa função.');
        }

        const daoProduct = new DAOProduct();

        const result = await daoProduct.getDashboard();

        return res.status(201).json(result);
    }
}
export { Controller }