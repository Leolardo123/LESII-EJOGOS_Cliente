import Brand from "@modules/models/cards/Brand";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateBrands implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Brand)
            .values([
                {
                    id: 1,
                    name: "visa",
                    image: `default/brand.png`
                },
                {
                    id: 2,
                    name: "mastercard",
                    image: `default/brand.png`
                }
            ]).execute()
    }
}