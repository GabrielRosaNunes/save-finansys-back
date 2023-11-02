import { Operation } from "./operation.entity"

export interface Ledger {
    id?: string
    accountId?: string
    categoryId?: string
    operation?: Operation
    value: number
    date: Date
    description: string
    paid: boolean
}

