import Domain from "@modules/models/Domain";
import Product from "@modules/models/products/Product";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, Unique } from "typeorm";
import Cart from "./Cart";
import RefundRequest from "./Refund";

@Entity("tb_carts_items")
@Unique(["cart", "product"])
export default class CartItem extends Domain {
  @Column()
  quantity: number;

  @Column()
  price: number;

  @JoinColumn({ name: "cart_id" })
  @ManyToOne(() => Cart, (cart) => cart.items, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
  })
  cart: Cart;

  @JoinColumn({ name: "product_id" })
  @ManyToOne(() => Product, (product) => product.cart_items, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
    nullable: false,
    cascade: true,
  })
  product: Product;

  @OneToOne(() => RefundRequest, (refund) => refund.cart_item, {
    eager: true,
  })
  refund: RefundRequest;

  constructor(cartItem?: Partial<CartItem>) {
    super();
    Object.assign(this, cartItem);
  }
}
