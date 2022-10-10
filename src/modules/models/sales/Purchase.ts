import Domain from "@modules/models/Domain";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import Address from "../address/Address";
import Card from "../cards/Card";
import Cart from "./Cart";
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
    
    @JoinColumn({ name: 'tb_purchases_cards' })
    @ManyToMany(() => Card, card => card.purchases, {
        onDelete: 'SET NULL', onUpdate: 'CASCADE',
    })
    cards: Card[];

    constructor(
        purchase?: Partial<Purchase>
    ) {
        super();
        Object.assign(this, purchase)
    }
}