import Domain from "@modules/models/Domain";
import Product from "@modules/models/products/Product";
import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import Cart from "./Cart";

@Entity('tb_carts_items')
@Unique(['cart', 'product'])
export default class CartItem extends Domain {
    @Column()
    quantity: number;

    @Column()
    price: number;

    @JoinColumn({ name: 'cart_id' })
    @ManyToOne(() => Cart, cart => cart.items, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        nullable: false,
    })
    cart: Cart;

    @JoinColumn({ name: 'product_id' })
    @ManyToOne(() => Product, product => product.cart_items, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        eager: true, nullable: false,
    })
    product: Product;

    constructor(
        cartItem?: Partial<CartItem>
    ) {
        super();
        Object.assign(this, cartItem)
    }
}