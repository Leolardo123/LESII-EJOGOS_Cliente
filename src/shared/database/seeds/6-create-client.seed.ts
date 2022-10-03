import { UserRolesEnum } from "@modules/models/users/enum/UserRolesEnum";
import Person from "@modules/models/users/Person";
import User from "@modules/models/users/User";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateClient implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    email: "jefferson@gmail.com",
                    password: "Admin@123",
                    role: UserRolesEnum.default,
                }
            ]).execute()
        await connection
            .createQueryBuilder()
            .insert()
            .into(Person)
            .values([
                {
                    name: "Jefferson Akira Fukamizu",
                    cpf: "55462356415",
                    gender_id: 1,
                    birth_date: "25/12/1997",
                    cellphone: "11312312313",
                    phone: {
                        ddd: 11,
                        number: "23235235315"
                    },
                    addresses: [
                        {
                            cep: "32523511",
                            place: "Rua ABC",
                            number: 5,
                            city: "Mogi das Cruzes",
                            state: "São Paulo",
                            country: "Brasil",
                            complement: '',
                            neighborhood: "Uma Vizinhança",
                            address_type: 1,
                            place_type: 1
                        },
                        {
                            cep: "325235222",
                            place: "Rua ABC",
                            number: 5,
                            city: "Mogi das Cruzes",
                            state: "São Paulo",
                            country: "Brasil",
                            complement: '',
                            neighborhood: "Uma Vizinhança",
                            address_type: 2,
                            place_type: 1
                        }
                    ]
                }
            ]).execute()
    }
}