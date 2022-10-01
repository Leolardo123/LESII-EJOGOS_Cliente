import Domain from "@modules/models/Domain";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import Address from "../address/Address";
import Card from "../cards/Card";
import Cart from "./Cart";
import Coupom from "./Coupom";
import { PurchaseStatusEnum } from "./enum/PurchaseStatus";

@Entity('tb_purchases')
export default class Purchase extends Domain {
    @Column()
    total_price: number;

    @Column({ enum: PurchaseStatusEnum, default: PurchaseStatusEnum.PENDING })
    status: string;

    @JoinColumn({ name: 'cart_id' })
    @OneToOne(() => Cart, cart => cart.purchase, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
    })
    cart: Cart;

    @JoinColumn({ name: 'payment_address_id' })
    @OneToMany(() => Address, address => address.payment, {
        onDelete: 'SET NULL', onUpdate: 'CASCADE',
    })
    payment_address: Address;

    @JoinColumn({ name: 'delivery_address_id' })
    @OneToMany(() => Address, address => address.delivery, {
        onDelete: 'SET NULL', onUpdate: 'CASCADE',
    })
    delivery_address: Address;

    @JoinTable({ name: 'tb_purchases_cards' })
    @ManyToMany(() => Card, card => card.purchases, {
        onDelete: 'SET NULL', onUpdate: 'CASCADE',
    })
    cards: Card[];

    @OneToOne(() => Coupom, coupom => coupom.purchase, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
    })
    coupom: Coupom;

    constructor(
        purchase?: Partial<Purchase>
    ) {
        super();
        Object.assign(this, purchase)
    }
}