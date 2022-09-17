import Address from "@modules/models/address/Address";
import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";
import Person from "@modules/models/users/Person";

export class VHAddress extends VHAbstract {
    getEntity(req: Request): Address | Person {
        const {
            person_id,
            ...address
        } = req.body;
        const { id } = req.params;

        const addressInstance = new Address();
        if(id){
            Object.assign(addressInstance, { id: Number(id) });
        }
    
    
        if(address.place_type_id){
            addressInstance.place_type = new PlaceType({ id: address.place_type_id })
        }

        if(address.address_type_id){
            addressInstance.address_type = new AddressType({ id: address.address_type_id })
        }

        if(person_id){
            const personInstance = new Person();
            Object.assign(personInstance, { id: Number(person_id) });
            addressInstance.persons = [personInstance];
        }

        Object.assign(addressInstance, address);

        return addressInstance;
    }
}