import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Domain from "../Domain";
import Person from "../users/Person";
import Brand from "./Brand";

@Entity('tb_cards')
class Card extends Domain {
    @Column()
    owner_name: string;

    @Column()
    number: string;

    @Column()
    brand_id: string;

    @Column()
    person_id: string;

    @Column()
    security_code: string;

    @JoinColumn({ name: 'brand_id' })
    @ManyToOne(() => Brand, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    brand: Brand;

    @JoinColumn({ name: 'person_id' })
    @ManyToOne(() => Person, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    person: Person;

    constructor(
        card?: Partial<Card>
    ) {
        super();
        Object.assign(this, card)
    }
}

export default Card;