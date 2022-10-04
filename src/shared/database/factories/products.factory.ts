import Product from "@modules/models/products/Product";
import { define } from "typeorm-seeding";
import { faker, Faker } from "@faker-js/faker";

define(Product, () => {
  const product = new Product({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    stock: Number(faker.random.numeric()),
    developer: faker.company.name(),
    publisher: faker.company.name(),
    release_date: faker.date.past().toString(),
    language: faker.random.locale(),
    image: 'default.png',
    requirements: faker.commerce.productMaterial(),
    subtitle: fakerRandomArray(
            Number(faker.random.numeric(1)), 
            faker.random.locale
        ).join(','),
  });
  return product;
});

const fakerRandomArray = (length: number, fker: () => string): string[] => {
  return Array.from({ length }, () => fker());
}