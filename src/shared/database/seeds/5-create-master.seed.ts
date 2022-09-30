import { UserRolesEnum } from "@modules/models/users/enum/UserRolesEnum";
import User from "@modules/models/users/User";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateBrands implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    email: "master@email.com",
                    password: "Admin@123",
                    role: UserRolesEnum.admin,
                }
            ]).execute()
    }
}