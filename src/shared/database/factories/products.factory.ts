import Product from "@modules/models/products/Product";
import { define } from "typeorm-seeding";
import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";

const fakerRandomArray = (length: number, fker: () => string): string[] => {
  return Array.from({ length }, () => fker());
};

define(Product, () => {
  const images: string[] = [];
  const folder = path.join(
    __dirname,
    ..."../../../../tmp/uploads/default".split("/")
  );

  fs.readdirSync(folder).forEach(file => {
    if (/^\d/.test(file.replace(/\.\w*/, ""))) {
      images.push(file);
    }
  });

  const product = new Product({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    stock: Number(faker.random.numeric()),
    developer: faker.company.name(),
    publisher: faker.company.name(),
    release_date: faker.date.past().toString(),
    language: faker.random.locale(),
    image: `/default/${faker.helpers.arrayElement(images)}`,
    requirements: faker.commerce.productMaterial(),
    subtitle: fakerRandomArray(
      Number(faker.random.numeric(1)),
      faker.random.locale
    ).join(","),
  });
  return product;
});
