import { Column } from "typeorm/decorator/columns/Column";
import { Entity } from "typeorm/decorator/entity/Entity";
import Domain from "../Domain";

@Entity('tb_phones')
class Phone extends Domain {
    @Column()
    number: string;

    @Column()
    ddd: number;

    @Column()
    person_id: string;

    constructor(
        phone?: Partial<Phone>
    ) {
        super();
        Object.assign(this, phone)
    }
}

export default Phone;