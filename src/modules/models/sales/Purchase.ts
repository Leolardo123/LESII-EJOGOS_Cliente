import Domain from "@modules/models/Domain";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import Address from "../address/Address";
import Card from "../cards/Card";
import Cart from "./Cart";
import Coupom from "./Coupom";
import { PurchaseStatusEnum } from "./enum/PurchaseStatus";
import Payment from "./Payment";

@Entity('tb_purchases')
export default class Purchase extends Domain {
    @Column()
    total_price: number;

    @Column({ enum: PurchaseStatusEnum, default: PurchaseStatusEnum.PENDING })
    status: string;

    @JoinColumn({ name: 'cart_id' })
    @OneToOne(() => Cart, cart => cart.purchase, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        cascade: true
    })
    cart: Cart;

    @JoinColumn({ name: 'payment_address_id' })
    @ManyToOne(() => Address, address => address.payment, {
        onDelete: 'RESTRICT', onUpdate: 'CASCADE',
        nullable: false, cascade: ['insert']
    })
    payment_address: Address;

    @JoinColumn({ name: 'delivery_address_id' })
    @ManyToOne(() => Address, address => address.delivery, {
        onDelete: 'RESTRICT', onUpdate: 'CASCADE',
        nullable: false, cascade: ['insert']
    })
    delivery_address: Address;

    @OneToMany(() => Coupom, coupom => coupom.purchase, {
        eager: true, cascade: ['update']
    })
    coupons: Coupom[];

    @OneToMany(() => Payment, payment => payment.purchase, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        cascade: true
    })
    payments: Payment[];

    constructor(
        purchase?: Partial<Purchase>
    ) {
        super();
        Object.assign(this, purchase)
    }
}