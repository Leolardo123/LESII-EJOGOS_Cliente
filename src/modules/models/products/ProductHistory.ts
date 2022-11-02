
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Domain from "../Domain";
import Product from "./Product";

@Entity("tb_product_history")
export default class ProductHistory extends Domain {

    @Column()
    action: string;

    @Column({ default: 'FORA DE MERCADO' })
    reason: string;

    @JoinColumn({ name: "product_id" })
    @ManyToOne(() => Product, product => product.history, {
        onDelete: "CASCADE", onUpdate: "CASCADE",
        nullable: false,
    })
    product: Product;

    constructor(
        product?: Partial<ProductHistory>
    ) {
        super();
        Object.assign(this, product)
    }
}