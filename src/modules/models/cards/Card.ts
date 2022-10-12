import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import Domain from "../Domain";
import Purchase from "../sales/Purchase";
import Person from "../users/Person";
import Brand from "./Brand";

@Entity('tb_cards')
class Card extends Domain {
    @Column()
    owner_name: string;

    @Column()
    number: string;

    @Column()
    brand_id: number;

    @Column()
    person_id: number;

    @Column()
    security_code: string;

    @JoinColumn({ name: 'person_id' })
    @ManyToOne(() => Person, person => person.cards, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    person: Person;

    @JoinColumn({ name: 'brand_id' })
    @ManyToOne(() => Brand, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    brand: Brand;

    @ManyToMany(() => Purchase, purchase => purchase.cards, {})
    purchases: Purchase[];

    constructor(
        card?: Partial<Card>
    ) {
        super();
        Object.assign(this, card)
    }
}

export default Card;