import Cart from "@modules/models/sales/Cart";
import CartItem from "@modules/models/sales/CartItem";
import Refund from "@modules/models/sales/Refund";
import Person from "@modules/models/users/Person";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { FindManyOptions, ILike } from "typeorm";
import { IGetEntity } from "./interface/IViewHelper";
import { VHAbstract } from "./VHAbstract";

export class VHRefund extends VHAbstract {
    getEntity(req: Request): Refund {
        const {
            reason,
            restock,
            status,
            id: item_id,
        } = req.body;
        const { id } = req.params;

        const refundInstance = new Refund({
            reason,
            restock,
            status,
        });

        const userInfo = ensureAuthenticated(req);
        if (status && userInfo.role != 'admin') {
            throw new Error('Operação não autorizada.');
        }

        if (userInfo.person) {
            const personInstance = new Person({ id: userInfo.person });
            const cartItemInstance = new CartItem({ id: item_id })
            const cartInstance = new Cart()

            cartInstance.person = personInstance;
            cartItemInstance.cart = cartInstance;
            refundInstance.cart_item = cartItemInstance;
        }

        if (id) {
            refundInstance.id = Number(id);
        }

        return refundInstance;
    }

    findEntity(req: Request): IGetEntity {
        const { search, page, limit } = req.query;

        const whereParams: FindManyOptions<Refund> = {};

        if (search) {
            whereParams.where = [
                { reason: ILike(`%${search}%`) },
            ];

            if (Number(search)) {
                whereParams.where.push({ id: Number(search) });
            }
        }

        whereParams.relations = ['cart_item', 'cart_item.product', 'cart_item.cart', 'cart_item.cart.person'];

        return {
            entity: new Refund(),
            whereParams,
        }
    }
}