
import { Column, DeepPartial, Entity, OneToMany } from "typeorm";
import Domain from "../Domain";
import CartItem from "../sales/CartItem";

@Entity("tb_products")
export default class Product extends Domain {

    @Column({ default: true })
    isActive: boolean;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'float' })
    price: number;

    @Column()
    stock: number;

    @Column()
    requirements: string;

    @Column()
    publisher: string;

    @Column()
    developer: string;

    @Column()
    language: string;

    @Column()
    subtitle: string;

    @Column()
    release_date: string;

    @Column()
    image: string;

    @OneToMany(() => CartItem, item => item.product, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    cart_items: CartItem[]

    setView(): DeepPartial<Product> {
        return {
            ...this,
            image_url: this.image ?
                `${process.env.APP_API_URL}/files/${this.image}` :
                `${process.env.APP_API_URL}/files/default/default.png`
        }
    }

    constructor(
        product?: Partial<Product>
    ) {
        super();
        Object.assign(this, product)
    }
}