
import { Column, Entity } from "typeorm";
import Domain from "../Domain";

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
}