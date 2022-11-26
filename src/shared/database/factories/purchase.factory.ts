import { faker } from '@faker-js/faker';
import { define } from "typeorm-seeding";
import Address from "@modules/models/address/Address";
import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import Cart from "@modules/models/sales/Cart";
import Purchase from "@modules/models/sales/Purchase";
define(Purchase, () => {
    const cart = new Cart({
        isOpen: false,
    })

    const purchase = new Purchase({
        cart,
        delivery_address: new Address({
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
        }),
        payment_address: new Address({
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
        })
    })

    purchase.total_price = purchase.cart.getTotalPrice();
    return purchase;
});