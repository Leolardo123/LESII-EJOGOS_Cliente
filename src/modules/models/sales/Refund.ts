import Domain from "@modules/models/Domain";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import CartItem from "./CartItem";
import { RefundStatusEnum } from "./enum/RefundStatus";

@Entity('tb_refunds')
export default class Refund extends Domain {
    @Column({ type: 'text' })
    reason: string;

    @Column({ default: true })
    restock: boolean;

    @Column({ enum: RefundStatusEnum, default: RefundStatusEnum.PENDING })
    status: string;

    @JoinColumn({ name: 'item_id' })
    @OneToOne(() => CartItem, item => item.refund, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
    })
    cart_item: CartItem;

    constructor(
        refund?: Partial<Refund>
    ) {
        super();
        Object.assign(this, refund)
    }
}