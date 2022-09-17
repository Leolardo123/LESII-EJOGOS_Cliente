import { Column } from "typeorm/decorator/columns/Column";
import { OneToOne } from "typeorm/decorator/relations/OneToOne";
import Domain from "../Domain";
import { UserRolesEnum } from "./enum/UserRolesEnum";
import Person from "./Person";

class User extends Domain {
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: UserRolesEnum.default })
    role: string;

    @OneToOne(() => Person, person => person.user, {
        cascade: true, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    person: Person;

    constructor(
        user?: Partial<User>
    ) {
        super();
        Object.assign(this, {
            ...user,
        })
    }

}

export default User;