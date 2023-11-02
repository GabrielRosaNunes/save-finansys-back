import { Injectable } from "@nestjs/common";
import { PrismaService } from "../config/prisma.service";
import { LedgerRepository } from "src/domain/repository/ledger.repository";
import { Ledger } from "src/domain/entity/ledger.entity";
@Injectable()
export class LedgerRepo implements LedgerRepository {
    constructor(private prisma: PrismaService) {}

    async find(ledgerId: string): Promise<Ledger> {
        const ledger = await this.prisma.ledger.findFirst({
            where: {
                id: ledgerId
            }
        })

        if (ledger) {
            return {
                id: ledger.id,
                accountId: ledger.account_id,
                categoryId: ledger.category_id,
                value: ledger.value,
                date: ledger.date,
                description: ledger.description,
                operation: ledger.operation,
                paid: ledger.paid
            }
        }
    }

    async getAllByAccount(accountId: string): Promise<Ledger[]> {
        const accountLedgers =await this.prisma.ledger.findMany({
            where: {
                account_id: accountId
            }
        })

        return accountLedgers.map(ledger => ({
            id: ledger.id,
            accountId: ledger.account_id,
            categoryId: ledger.category_id,
            value: ledger.value,
            date: ledger.date,
            description: ledger.description,
            operation: ledger.operation,
            paid: ledger.paid
        }))
    }
    async insert(ledger: Ledger): Promise<void> {
        await this.prisma.ledger.create({
            data: {
                account_id: ledger.accountId,
                category_id: ledger.categoryId,
                value: ledger.value,
                description: ledger.description,
                date: ledger.date,
                paid: ledger.paid,
                operation: ledger.operation
            }
        })
    }
    async update(ledgerId: string, ledger: Ledger): Promise<void> {
        await this.prisma.ledger.update({
            where: {
                id: ledgerId
            },
            data: {
                category_id: ledger.categoryId,
                value: ledger.value,
                description: ledger.description,
                date: ledger.date,
                paid: ledger.paid,
            }
        })
    }
    
    async delete(ledgerId: string): Promise<void> {
        await this.prisma.ledger.delete({
            where: {
                id: ledgerId
            }
        })
    }
}