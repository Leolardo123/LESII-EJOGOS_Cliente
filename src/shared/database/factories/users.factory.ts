import User from "@modules/models/users/User";
import { faker } from '@faker-js/faker';
import { define } from "typeorm-seeding";
import Gender from "@modules/models/users/Gender";
import Phone from "@modules/models/users/Phone";
import Address from "@modules/models/address/Address";
import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import Person from "@modules/models/users/Person";
import Coupom from "@modules/models/sales/Coupom";
import { CoupomTypeEnum } from "@modules/models/sales/enum/CoupomTypes";
import { SimpleConsoleLogger } from "typeorm";

define(User, () => {
    const coupons = createManyCoupons(10)
    const user = new User({
        email: faker.internet.email(),
        password: 'Admin@123',
        role: 'usuario',
        isActive: true,
        person: new Person({
            coupons,
            cpf: faker.random.numeric(11),
            name: faker.name.firstName() + " " + faker.name.lastName(),
            gender: new Gender({ id: Math.random() > 0.5 ? 1 : 2 }),
            birth_date: faker.date.past(),
            cellphone: faker.phone.phoneNumber(),
            phone: new Phone({ number: faker.phone.number(), ddd: 11 }),
            addresses: [
                new Address({
                    cep: faker.address.zipCode(),
                    place: faker.address.streetName(),
                    number: Number(faker.random.numeric(4)),
                    city: faker.address.city(),
                    state: faker.address.state(),
                    country: faker.address.country(),
                    complement: faker.address.secondaryAddress(),
                    neighborhood: faker.address.county(),
                    address_type: new AddressType({
                        id: 1
                    }),
                    place_type: new PlaceType({
                        id: 1
                    })
                }
                ),
                new Address({
                    cep: faker.address.zipCode(),
                    place: faker.address.streetName(),
                    number: Number(faker.random.numeric(4)),
                    city: faker.address.city(),
                    state: faker.address.state(),
                    country: faker.address.country(),
                    complement: faker.address.secondaryAddress(),
                    neighborhood: faker.address.county(),
                    address_type: new AddressType({
                        id: 2
                    }),
                    place_type: new PlaceType({
                        id: 1
                    })
                })
            ],
        })
    });
    console.log(user.person.coupons);
    return user;
});

function createManyCoupons(length: number): Coupom[] {
    return Array.from({ length }, () => createCoupom());
}

function createCoupom(): Coupom {
    return {
        value: Number(faker.commerce.price()),
        type: CoupomTypeEnum.RETURN_PRODUCT,
        created_at: faker.date.past(),
        is_used: false,
    } as Coupom;
}