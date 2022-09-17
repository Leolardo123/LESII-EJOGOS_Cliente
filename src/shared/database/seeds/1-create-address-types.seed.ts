
import AddressType from "../../../modules/models/address/AddressType";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateAddressTypes implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
        .createQueryBuilder()
        .insert()
        .into(AddressType)
        .values([
            {
                name:'entrega',
            },
            {
                name:'cobrança',
            },
            {
                name:'ambos',
            }
        ]).execute()
    }
}