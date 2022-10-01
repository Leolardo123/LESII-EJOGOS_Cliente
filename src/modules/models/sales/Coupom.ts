import Domain from "@modules/models/Domain";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CoupomTypeEnum } from "./enum/CoupomTypes";
import Purchase from "./Purchase";

@Entity()
export default class Coupom extends Domain {
    @Column()
    code: string;

    @Column({ default: 0 })
    value: number;

    @Column({ enum: CoupomTypeEnum, default: CoupomTypeEnum.RETURN_PRODUCT })
    type: string;

    @JoinColumn({ name: 'purchase_id' })
    @OneToOne(() => Purchase, purchase => purchase.coupom, {})
    purchase: Purchase;

    constructor(
        coupom?: Partial<Coupom>
    ) {
        super();
        Object.assign(this, coupom)
    }
}