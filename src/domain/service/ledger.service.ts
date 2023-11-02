import { Injectable, NotFoundException } from "@nestjs/common";
import { AccountRepo } from "src/infraestructure/repositories/account.repository";
import { CategoryRepo } from "src/infraestructure/repositories/category.repository";
import { LedgerRepo } from "src/infraestructure/repositories/ledger.repository";
import { CreateLedgerRegisterDto, UpdateLedgerRegisterDto } from "../aggregate/ledger.aggregate";


@Injectable()
export class LedgerService {
    constructor(
        private ledgerRepo: LedgerRepo,
        private accountRepo: AccountRepo,
        private categoryRepo: CategoryRepo
    ) {}

    async insertLedger(ledgerDto:CreateLedgerRegisterDto): Promise<void> {
        const account = await this.accountRepo.find(ledgerDto.accountId)

        if (!account) {
            throw new NotFoundException("Account not found")
        }

        const category = await this.categoryRepo.find(ledgerDto.categoryId)

        if (!category) {
            throw new NotFoundException("Category not found")
        }

        await this.ledgerRepo.insert({
            accountId: ledgerDto.accountId,
            categoryId: ledgerDto.categoryId,
            value: ledgerDto.value,
            date: new Date(ledgerDto.date),
            description: ledgerDto.description,
            operation:ledgerDto.operation,
            paid: ledgerDto.paid
        })
    }

    async updateLedger(ledgerId:string,ledgerDto:UpdateLedgerRegisterDto): Promise<void> {
        const ledger = await this.ledgerRepo.find(ledgerId)

        if (!ledger) {
            throw new NotFoundException("Ledger not found")
        }

        const category = await this.categoryRepo.find(ledgerDto.categoryId)

        if (!category) {
            throw new NotFoundException("Category not found")
        }

        await this.ledgerRepo.update(ledgerId, {
            categoryId: ledgerDto.categoryId,
            date: new Date(ledgerDto.date),
            value: ledgerDto.value,
            description: ledgerDto.description,
            paid: ledgerDto.paid
        })
    }

    async deleteLedger(ledgerId: string): Promise<void> {
        await this.ledgerRepo.delete(ledgerId)
    }
}