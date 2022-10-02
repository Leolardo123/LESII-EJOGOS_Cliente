import Address from "@modules/models/address/Address";
import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import Gender from "@modules/models/users/Gender";
import Person from "@modules/models/users/Person";
import Phone from "@modules/models/users/Phone";
import User from "@modules/models/users/User";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import moment from 'moment';

export class VHUser extends VHAbstract {
    getEntity(req: Request): User {
        const {
            isActive,
            user,
            person,
            addresses,
        } = req.body;
        const { id } = req.params;

        const userInstance = new User();
        Object.assign(userInstance, user);

        if(id) {
            const userInfo = ensureAuthenticated(req);
            if(id){
                Object.assign(userInstance, { id: Number(id) });
            }

            if(userInfo.role === 'admin' || userInfo.id === Number(id)){
                if(isActive){
                    Object.assign(userInstance, { 
                        isActive: isActive === 1 ? true : false,
                    });
                }
            }
        }

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
            personInstance.birth_date = moment(person.birth_date, "DD/MM/YYYY").toDate();
            personInstance.addresses = addressesInstances;
            userInstance.person = personInstance;
        }

        return userInstance;
    }
    
    setView(req: Request, res: any, result: User[] | User | string): void {
        if (typeof result === 'string') {
            res.status(201).json({ message: result });
        } else {
            if(result instanceof Array){
                res.status(201).json(
                    result.map(({password, ...user}: User) => {
                        return user
                    })
                );
            } else {
                const { password, ...user} = result;
                res.status(201).json(user);
            }
        }
    }
}