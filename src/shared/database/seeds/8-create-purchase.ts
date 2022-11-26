import { faker } from "@faker-js/faker";
import Address from "@modules/models/address/Address";
import AddressType from "@modules/models/address/AddressType";
import PlaceType from "@modules/models/address/PlaceType";
import Product from "@modules/models/products/Product";
import Cart from "@modules/models/sales/Cart";
import CartItem from "@modules/models/sales/CartItem";
import Purchase from "@modules/models/sales/Purchase";
import Person from "@modules/models/users/Person";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreatePurchases implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        let products = await connection.getRepository(Product).find();
        let persons = await connection.getRepository(Person).find();

        if (products.length === 0) {
            throw new Error("No products found");
        }

        if (persons.length === 0) {
            throw new Error("No persons found");
        }

        const purchases = Array.from({ length: 50 }, () => {
            const person = faker.helpers.arrayElement(persons);
            return createPurchase(products, person);
        });

        await connection.getRepository(Purchase).save(purchases);
    }
}

function createPurchase(products: Product[], person: Person): Purchase {
    const purchase = new Purchase({
        cart: new Cart({
            person: person,
            isOpen: false,
            items: createManyItems(3, products),
        }),
        created_at: faker.date.past(3),
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
}

function createManyItems(length: number, products: Product[]): CartItem[] {
    if (length > products.length) {
        throw new Error("Not enough products for the amount of items");
    }

    return Array.from({ length }, () => {
        const product = faker.helpers.arrayElement(products);
        products = products.filter(p => p.id !== product.id);

        return createItem(product)
    });
}

function createItem(product: Product): CartItem {
    const qtt = Number(faker.random.numeric(1));
    const price = product.price * qtt;
    return {
        quantity: qtt,
        price,
        product,
    } as CartItem;
}