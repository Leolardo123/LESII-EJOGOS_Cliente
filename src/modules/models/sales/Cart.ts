import Domain from "@modules/models/Domain";
import Person from "@modules/models/users/Person";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import CartItem from "./CartItem";
import Purchase from "./Purchase";

@Entity('tb_item_carts')
export default class Cart extends Domain {
    @OneToMany(() => CartItem, cartItem => cartItem.cart, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        eager: true,
        cascade: ['insert']
    })
    items: CartItem[];

    @Column({ default: true })
    isOpen: boolean;

    @Column()
    person_id: number;

    @JoinColumn({ name: 'person_id' })
    @ManyToOne(() => Person, person => person.carts, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        nullable: false, 
    })
    person: Person;

    @OneToOne(() => Purchase, purchase => purchase.cart, {
        eager: true,
    })
    purchase: Purchase;

    constructor(
        cart?: Partial<Cart>
    ) {
        super();
        Object.assign(this, cart)
    }

    getTotalPrice(): number {
        if(this.items.length > 0) {
            return this.items.reduce(
                (total, item) => total + item.price, 0
            )
        }
        return 0
    }
}