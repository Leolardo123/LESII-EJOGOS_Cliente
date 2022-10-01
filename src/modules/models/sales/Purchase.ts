import Domain from "@modules/models/Domain";
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

    @Column()
    payment_address_id: number;

    @Column()
    delivery_address_id: number;

    @Column({ enum: PurchaseStatusEnum, default: PurchaseStatusEnum.PENDING })
    status_id: string;

    @JoinColumn({ name: 'cart_id' })
    @OneToOne(() => Cart, cart => cart.purchase, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
    })
    cart: Cart;

    @JoinTable()
    @ManyToMany(() => Card)
    cards: Card[];

    constructor(
        purchase?: Partial<Purchase>
    ) {
        super();
        Object.assign(this, purchase)
    }
}