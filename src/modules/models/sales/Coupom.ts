import Domain from "@modules/models/Domain";
import { Column, Entity, OneToOne } from "typeorm";
import { CoupomTypeEnum } from "./enum/CoupomTypes";
import PurchaseCoupom from "./PurchaseCoupom";

@Entity()
export default class Coupom extends Domain {
    @Column()
    code: string;

    @Column({ default: 0 })
    value: number;

    @Column({ enum: CoupomTypeEnum, default: CoupomTypeEnum.RETURN_PRODUCT })
    type_id: string;

    @OneToOne(() => PurchaseCoupom)
    purchase: PurchaseCoupom;

    constructor(
        coupom?: Partial<Coupom>
    ) {
        super();
        Object.assign(this, coupom)
    }
}