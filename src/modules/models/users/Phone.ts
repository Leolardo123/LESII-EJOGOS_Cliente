import { Column } from "typeorm/decorator/columns/Column";
import { Entity, OneToOne, JoinColumn } from "typeorm";
import Domain from "../Domain";
import Person from "./Person";

@Entity('tb_phones')
class Phone extends Domain {
    @Column()
    number: string;

    @Column()
    ddd: number;

    @Column()
    person_id: string;

    @JoinColumn({ name: 'person_id' })
    @OneToOne(() => Person, person => person.phone, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    person: Person;

    constructor(
        phone?: Partial<Phone>
    ) {
        super();
        Object.assign(this, phone)
    }
}

export default Phone;