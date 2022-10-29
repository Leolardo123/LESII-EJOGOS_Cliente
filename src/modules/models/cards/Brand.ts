import { Column, DeepPartial, Entity } from "typeorm";
import Domain from "../Domain";

@Entity('tb_brands')
class Brand extends Domain {
    @Column()
    name: string;

    @Column()
    image: string;

    setView(): DeepPartial<Brand> {
        return {
            ...this,
            image_url: this.image ?
                `${process.env.APP_API_URL}/files/${this.image}` :
                `${process.env.APP_API_URL}/files/default/default.png`
        }
    }

    constructor(
        brand?: Partial<Brand>
    ) {
        super();
        Object.assign(this, brand)
    }
}

export default Brand;