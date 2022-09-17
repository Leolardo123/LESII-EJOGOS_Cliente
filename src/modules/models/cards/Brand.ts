import { Column, Entity } from "typeorm";
import Domain from "../Domain";

@Entity('tb_brands')
class Brand extends Domain {
    @Column()
    name: string;

    @Column()
    image: string;

    constructor(
        brand?: Partial<Brand>
    ) {
        super();
        Object.assign(this, brand)
    }
}

export default Brand;