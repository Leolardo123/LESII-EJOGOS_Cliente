import User from "@modules/models/users/User";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateClient implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await factory(User)().create();
    }
}