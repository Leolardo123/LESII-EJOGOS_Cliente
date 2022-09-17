import Domain from "../Domain";
import Person from "./Person";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('tb_genders')
class Gender extends Domain {
    @Column()
    name: string;

    @OneToMany(() => Person , person => person.gender)
    persons: Person[];

    constructor(
       gender?: Partial<Gender>
    ) {
        super();
        Object.assign(this, gender)
    }
}

export default Gender;