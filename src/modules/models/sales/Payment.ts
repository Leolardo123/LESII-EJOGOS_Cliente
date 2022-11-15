import Domain from "@modules/models/Domain";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import Card from "../cards/Card";
import Purchase from "./Purchase";

@Entity('tb_purchase_payments')
export default class Payment extends Domain {
    @Column()
    value: number;

    @JoinColumn({ name: 'card_id' })
    @ManyToOne(() => Card, card => card.payments, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
    })
    card: Card;

    @JoinColumn({ name: 'purchase_id' })
    @ManyToOne(() => Purchase, purchase => purchase.payments, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
    })
    purchase: Purchase;

    constructor(
        payment?: Partial<Payment>
    ) {
        super();
        Object.assign(this, payment)
    }
}