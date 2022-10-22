import Product from "@modules/models/products/Product";
import path from "path";
import fs from "fs";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateProduct implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await factory(Product)().createMany(40);
    }
}
