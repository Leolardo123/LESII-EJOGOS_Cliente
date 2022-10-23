import Domain from "@modules/models/Domain";
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import Person from "../users/Person";
import { CoupomTypeEnum } from "./enum/CoupomTypes";
import Purchase from "./Purchase";
import Refund from "./Refund";

@Entity()
export default class Coupom extends Domain {
    @Generated('uuid')
    @Column()
    code: string;

    @Column({ default: 0 })
    value: number;

    @Column({ enum: CoupomTypeEnum, default: CoupomTypeEnum.RETURN_PRODUCT })
    type: string;

    @Column({ default: false })
    is_used: boolean;

    @JoinColumn({ name: 'purchase_id' })
    @ManyToOne(() => Purchase, purchase => purchase.coupons, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
    })
    purchase: Purchase | null;

    @JoinColumn({ name: 'person_id' })
    @ManyToOne(() => Person, person => person.coupons, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
    })
    person: Person | null;

    @OneToOne(() => Refund, refund => refund.coupom, {})
    refund: Refund;

    constructor(
        coupom?: Partial<Coupom>
    ) {
        super();
        Object.assign(this, coupom)
    }
}