import Domain from "@modules/models/Domain";
import Person from "@modules/models/users/Person";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import CartItem from "./CartItem";
import Purchase from "./Purchase";

@Entity('tb_item_carts')
export default class Cart extends Domain {
    @Column()
    total_price: number;

    @Column()
    person_id: number;

    @OneToMany(() => CartItem, cartItem => cartItem.cart, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        eager: true,
        cascade: ['insert', 'update']
    })
    items: CartItem[];

    @Column({ default: true })
    isOpen: boolean;

    @JoinColumn({ name: 'person_id' })
    @ManyToOne(() => Person, person => person.carts)
    person: Person;

    @OneToOne(() => Purchase, purchase => purchase.cart, {
        eager: true
    })
    purchase: Purchase;

    constructor(
        cart?: Partial<Cart>
    ) {
        super();
        Object.assign(this, cart)
    }
}