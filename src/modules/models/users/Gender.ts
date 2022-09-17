import Domain from "../Domain";
import { Column, Entity } from "typeorm";

@Entity('tb_genders')
class Gender extends Domain {
    @Column()
    name: string;

    constructor(
       gender?: Partial<Gender>
    ) {
        super();
        Object.assign(this, gender)
    }
}

export default Gender;