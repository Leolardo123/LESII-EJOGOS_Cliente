import Address from "@modules/models/address/Address";
import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import Gender from "@modules/models/users/Gender";
import Person from "@modules/models/users/Person";
import Phone from "@modules/models/users/Phone";
import User from "@modules/models/users/User";
import { Request } from "express";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import moment from "moment";
import { VHAbstract } from "./VHAbstract";
import { FindManyOptions, ILike, Not } from "typeorm";
import { IGetEntity } from "./interface/IViewHelper";

export class VHUser extends VHAbstract {
  getEntity(req: Request): User {
    const { user, person, addresses } = req.body;
    const { id } = req.params;

    const userInstance = new User();
    Object.assign(userInstance, user);

    if (id) {
      const userInfo = ensureAuthenticated(req);
      if (id) {
        userInstance.id = Number(id);
      }

      if (userInfo.role === "admin") {
        if (user.isActive !== undefined) {
          userInstance.isActive = user.isActive;
        }
      }
    }

    if (person) {
      const addressesInstances = addresses
        ? addresses.map((address: any) => {
          const addressInstance = new Address();

          if (address.place_type_id) {
            addressInstance.place_type = new PlaceType({
              id: address.place_type_id,
            });
          }
          if (address.address_type_id) {
            addressInstance.address_type = new AddressType({
              id: address.address_type_id,
            });
          }
          Object.assign(addressInstance, address);

          return addressInstance;
        })
        : [];

      const personInstance = new Person();
      Object.assign(personInstance, person);
      if (person.gender_id) {
        const genderInstance = new Gender({ id: person.gender_id });
        personInstance.gender = genderInstance;
      }
      if (person.phone) {
        const phoneInstance = new Phone(person.phone);
        personInstance.phone = phoneInstance;
      }
      personInstance.birth_date = moment(
        person.birth_date,
        "DD/MM/YYYY"
      ).toDate();
      personInstance.addresses = addressesInstances;
      userInstance.person = personInstance;
    }

    return userInstance;
  }

  findEntity(req: Request): IGetEntity {
    const { search, page, limit } = req.query;
    const { id } = req.params;
    const { role } = req.body;

    let whereParams = {} as FindManyOptions<User>;
    let includeFilters = {} as FindManyOptions<User>;// Filtros que sempre devem ser incluidos

    if (!id) {
      const userInfo = ensureAuthenticated(req);
      if (userInfo.role != "admin") {
        throw new Error('Não autorizado');
      }
      // includeFilters = {
      //   where: {
      //     id: Not(userInfo.id),
      //   },
      // }
    }

    if (role) {
      includeFilters = {
        where: {
          role,
        },
      }
    }

    if (search) {
      whereParams.where = [
        {
          ...includeFilters.where as any,
          email: ILike(`%${search}%`)
        },
        {
          ...includeFilters.where as any,
          person: {
            name: ILike(`%${search}%`)
          }
        },
      ]
    }

    if (id) {
      whereParams.where = { id: Number(id) };
    }

    if (!whereParams.where) {
      whereParams.where = includeFilters.where;
    }

    whereParams.relations = [
      "person",
      "person.addresses",
      "person.phone"
    ];

    return {
      entity: new User(),
      whereParams,
    }
  }
}
