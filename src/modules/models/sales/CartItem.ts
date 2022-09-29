import Domain from "@modules/models/Domain";
import Product from "@modules/models/products/Product";
import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import Cart from "./Cart";

@Entity('tb_carts_items')
@Unique(['cart_id', 'product_id'])
export default class CartItem extends Domain {
    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    cart_id: number;

    @Column()
    product_id: number;

    @JoinColumn({ name: 'cart_id' })
    @ManyToOne(() => Cart, cart => cart.cartItems)
    cart: Cart;

    @JoinColumn({ name: 'product_id' })
    @ManyToOne(() => Product, {
        eager: true
    })
    product: Product;

    constructor(
        cartItem?: Partial<CartItem>
    ) {
        super();
        Object.assign(this, cartItem)
    }
}