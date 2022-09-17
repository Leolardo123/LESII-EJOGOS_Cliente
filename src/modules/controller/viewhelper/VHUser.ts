import Address from "@modules/models/address/Address";
import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import Gender from "@modules/models/users/Gender";
import Person from "@modules/models/users/Person";
import Phone from "@modules/models/users/Phone";
import User from "@modules/models/users/User";
import whereBuilder from "@shared/utils/whereBuilder";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";
import { IGetQuery } from "./interface/IViewHelper";

export class VHUser extends VHAbstract {
    getEntity(req: Request): User {
        const {
            user,
            person,
            addresses,
        } = req.body;
        const { id } = req.params;

        const userInstance = new User({ id: id ? Number(id) : undefined });
        Object.assign(userInstance, user);

        if(person){
            const addressesInstances = addresses ? addresses.map((address: any) => {
                const addressInstance = new Address();
    
                if(address.place_type_id){
                    addressInstance.place_type = new PlaceType({ id: address.place_type_id })
                }
                if(address.address_type_id){
                    addressInstance.address_type = new AddressType({ id: address.address_type_id })
                }
                Object.assign(addressInstance, address);
    
                return addressInstance;
            }) : []

            const personInstance = new Person();
            Object.assign(personInstance, person);
            if(person.gender_id){
                const genderInstance = new Gender({ id: person.gender_id });
                personInstance.gender = genderInstance;
            }
            if(person.phone){
                const phoneInstance = new Phone(person.phone);
                personInstance.phone = phoneInstance;
            }
            personInstance.addresses = addressesInstances;
            userInstance.person = personInstance;
        }

        return userInstance;
    }

    getQuery(req: Request): IGetQuery {
        const {
            ...filters
        } = req.body;
        const { id } = req.params;

        const entity = new User()

        const where = whereBuilder({
            parameters: [
                {
                    column: 'tb_users.id',
                    value: id
                },
            ]
        })

        return { 
            entity,
            where,
        }
    }

    setView(req: Request, res: any, result: User[] | string): void {
        const { password: _, ...userWithoutPassword } = result;
        res.json(userWithoutPassword);
    }
}