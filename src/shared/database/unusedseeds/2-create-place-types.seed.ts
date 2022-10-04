
import PlaceType from "../../../modules/models/address/PlaceType";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreatePlaceTypes implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
        .createQueryBuilder()
        .insert()
        .into(PlaceType)
        .values([
            {
                name:"Alameda"
            },
            {
                name:"Avenida"
            },
            {
                name:"Beco"
            },
            {
                name:"Bloco"
            },
            {
                name:"Condomínio"
            },
            {
                name:"Distrito"
            },
            {
                name:"Rua"
            },
            {
                name:"Residencial"
            },
            {
                name:"Sitio"
            },
            {
                name:"Vila"
            },
            {
                name:"Outro"
            },
        ]).execute()
    }
}   