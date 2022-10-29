import { Column, DeepPartial, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import Domain from "../Domain";
import Payment from "../sales/Payment";
import Person from "../users/Person";
import Brand from "./Brand";

@Entity('tb_cards')
class Card extends Domain {
    @Column()
    owner_name: string;

    @Column()
    number: string;

    @Column()
    security_code: string;

    @JoinColumn({ name: 'person_id' })
    @ManyToOne(() => Person, person => person.cards, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        nullable: false
    })
    person: Person;

    @JoinColumn({ name: 'brand_id' })
    @ManyToOne(() => Brand, {
        onDelete: 'SET NULL', onUpdate: 'CASCADE',
    })
    brand: Brand;

    @OneToMany(() => Payment, payment => payment.card, {})
    payments: Payment[];

    private maskNumber(): string {
        return this.number.replace(/.(?=.{4})/g, '*');
    }

    setView(): DeepPartial<Card> {
        return {
            id: this.id,
            owner_name: this.owner_name,
            number: this.maskNumber(),
            security_code: this.security_code,
            brand: this.brand,
            person: this.person,
            created_at: this.created_at,
        }
    }

    constructor(
        card?: Partial<Card>
    ) {
        super();
        Object.assign(this, card)
    }
}

export default Card;