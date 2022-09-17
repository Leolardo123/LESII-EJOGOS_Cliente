import Gender from "../../../modules/models/users/Gender";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateGenderTypes implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Gender)
            .values([
                {
                    name: 'masculino',
                },
                {
                    name: 'feminino',
                },
                {
                    name: 'outro',
                }
            ]).execute()
    }
}