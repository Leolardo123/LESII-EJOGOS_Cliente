import Domain from "../Domain";
import { UserRolesEnum } from "./enum/UserRolesEnum";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne } from "typeorm";
import Person from "./Person";

@Entity('tb_users')
class User extends Domain {
    @Column({ unique: true })
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