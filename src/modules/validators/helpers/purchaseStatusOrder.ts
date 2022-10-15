import { PurchaseStatusEnum } from "@modules/models/sales/enum/PurchaseStatus";

export const purchaseStatusOrder = [
    {
        status: PurchaseStatusEnum.PENDING,
        next: [
            PurchaseStatusEnum.PAID,
        ]
    },
    {
        status: PurchaseStatusEnum.PAID,
        next: [
            PurchaseStatusEnum.TRANSPORTING,
        ]
    },
    {
        status: PurchaseStatusEnum.TRANSPORTING,
        next: [
            PurchaseStatusEnum.DELIVERED,
        ]
    },
    {
        status: PurchaseStatusEnum.DELIVERED,
        next: [
            PurchaseStatusEnum.FINISHED,
        ],
    },
]