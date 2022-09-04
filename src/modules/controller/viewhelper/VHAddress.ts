import Address from "@modules/models/address/Address";
import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import whereBuilder from "@shared/utils/whereBuilder";
import { Request } from "express";
import { IGetQuery, IViewHelper } from "./IViewHelper";

export class VHAddress implements IViewHelper {
    getEntity(req: Request): Address {
        const {
           address: {
                address_type_id,
                place_type_id,
                ...address
           },
        } = req.body;
        const { id } = req.params;

        const addressTypeInstance = new AddressType({ 
            id: address_type_id ? Number(address_type_id) : undefined 
        });

        const placeTypeInstance = new PlaceType({ 
            id: place_type_id ? Number(place_type_id) : undefined 
        });

        const addressInstance = new Address({ id: id ? Number(id) : undefined });
        Object.assign(addressInstance, address);

        addressInstance.address_type = addressTypeInstance;
        addressInstance.place_type = placeTypeInstance;

        return addressInstance;
    }

    getQuery(req: Request): IGetQuery {
        const {
            ...filters
        } = req.body;
        const { id } = req.params;

        const entity = new Address()

        const where = whereBuilder({
            parameters: [
                {
                    column: 'id',
                    value: id
                },
            ]
        })

        return { 
            entity,
            where,
        }
    }
}