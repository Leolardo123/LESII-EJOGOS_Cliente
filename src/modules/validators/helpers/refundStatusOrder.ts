import { RefundStatusEnum } from "@modules/models/sales/enum/RefundStatus";

export const refundStatusOrder = [
    {
        status: RefundStatusEnum.PENDING,
        next: [
            RefundStatusEnum.ACCEPTED,
            RefundStatusEnum.REFUSED,
        ]
    },
    {
        status: RefundStatusEnum.ACCEPTED,
        next: [
            RefundStatusEnum.TRANSPORTING,
        ]
    },
    {
        status: RefundStatusEnum.TRANSPORTING,
        next: [
            RefundStatusEnum.DELIVERED,
            RefundStatusEnum.CANCELED,
        ],
    },
    {
        status: RefundStatusEnum.DELIVERED,
        next: [
            RefundStatusEnum.FINISHED,
            RefundStatusEnum.CANCELED,
        ],
    },
]