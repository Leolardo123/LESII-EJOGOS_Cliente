import Domain from "@modules/models/Domain";
import Person from "@modules/models/users/Person";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import Card from "../cards/Card";
import Cart from "./Cart";
import { PurchaseStatusEnum } from "./enum/PurchaseStatus";

@Entity('tb_purchases')
export default class Purchase extends Domain {
    @Column()
    total_price: number;

    @Column()
    cart_id: string;

    @Column({ default: 'credit_card'})
    payment_method: string;

    @Column()
    person_id: string;

    @Column({ enum: PurchaseStatusEnum, default: PurchaseStatusEnum.PENDING })
    status_id: string;

    @JoinColumn({ name: 'cart_id' })
    @OneToOne(() => Cart, cart => cart.purchase)
    cart: Cart;

    @JoinTable()
    @ManyToMany(() => Card)
    cards: Card[];

    @OneToOne(() => Person)
    person: Person;

    constructor(
        purchase?: Partial<Purchase>
    ) {
        super();
        Object.assign(this, purchase)
    }
}