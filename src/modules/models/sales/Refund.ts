import Domain from "@modules/models/Domain";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import CartItem from "./CartItem";
import { RefundStatusEnum } from "./enum/RefundStatus";

@Entity('tb_refunds')
export default class RefundRequest extends Domain {
    @Column()
    quantity: number;

    @Column({ enum: RefundStatusEnum, default: RefundStatusEnum.PENDING })
    status: string;

    @JoinColumn({ name: 'item_id' })
    @OneToOne(() => CartItem, item => item.refund, {
        onDelete: 'CASCADE', onUpdate: 'CASCADE',
        eager: true,
    })
    cart_item: CartItem;

    constructor(
        refund?: Partial<RefundRequest>
    ) {
        super();
        Object.assign(this, refund)
    }
}