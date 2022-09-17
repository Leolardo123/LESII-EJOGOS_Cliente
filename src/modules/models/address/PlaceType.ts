import { Column } from "typeorm/decorator/columns/Column";
import { Entity } from "typeorm/decorator/entity/Entity";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import Domain from "../Domain";
import Address from "./Address";

@Entity('tb_places_types')
class PlaceType extends Domain {
    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Address, address => address.place_type, {
        onDelete: 'RESTRICT', onUpdate: 'CASCADE'
    })
    address: Address

    constructor(
        type?: Partial<PlaceType>
     ) {
         super();
         Object.assign(this, type)
     }
    public validate(): void {
        if(!this.name){
            throw new Error('Nome é um campo  obrigatório (Tipo de Logradouro).')
        }
    }
}

export default PlaceType;