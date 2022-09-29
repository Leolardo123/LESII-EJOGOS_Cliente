import Domain from "@modules/models/Domain";
import Person from "@modules/models/users/Person";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import CartItem from "./CartItem";
import { CartStatusEnum } from "./enum/CartStatus";


@Entity('tb_item_carts')
export default class Cart extends Domain {

    @Column()
    total_price: number;

    @Column()
    person_id: number;

    @Column()
    payment_address_id: number;

    @Column()
    delivery_address_id: number;

    @Column({ enum: CartStatusEnum, default: CartStatusEnum.CART_STATUS_OPEN })
    status_id: string;

    @OneToMany(() => CartItem, cartItem => cartItem.cart, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        eager: true
    })
    cartItems: CartItem[];

    @JoinColumn({ name: 'person_id' })
    @ManyToOne(() => Person, person => person.carts)
    person: Person;

    constructor(
        cart?: Partial<Cart>
    ) {
        super();
        Object.assign(this, cart)
    }
}