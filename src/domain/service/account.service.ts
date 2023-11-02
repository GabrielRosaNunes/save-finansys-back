import { Injectable, NotFoundException,UnprocessableEntityException } from "@nestjs/common";
import { AccountRepo } from "src/infraestructure/repositories/account.repository";
import { UserRepo } from "src/infraestructure/repositories/user.repository";
import { CreateAccountDto, UpdateAccountDto } from "../aggregate/account.aggregate";
import { LedgerRepo } from "src/infraestructure/repositories/ledger.repository";
import { Ledger } from "../entity/ledger.entity";

@Injectable()
export class AccountService {
    constructor(
        private userRepo: UserRepo,
        private accountRepo: AccountRepo,
        private ledgerRepo: LedgerRepo
    ) {}

    async getAccountLedgers(accountId:string): Promise<Ledger[]> {
        return await this.ledgerRepo.getAllByAccount(accountId)
    }

    async insertAccount(accountDto: CreateAccountDto): Promise<void> {
        const user = await this.userRepo.find(accountDto.userId)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        await this.accountRepo.insert({
            userId: accountDto.userId,
            name: accountDto.name
        })
    }

    async updateAccount(accountId: string,accountDto:UpdateAccountDto): Promise<void> {
        const account = await this.accountRepo.find(accountId)

        if (!account) {
            throw new NotFoundException("Account not found")
        }

        await this.accountRepo.update(accountId,{
            name: accountDto.name
        })
    }

    async deleteAccount(accountId: string): Promise<void> {
        const ledgers = await this.getAccountLedgers(accountId)

        if (ledgers.length > 0) {
            throw new UnprocessableEntityException("Can't delete because exists bills on account, please, delete them before delete the account")
        }

        await this.accountRepo.delete(accountId)
    }
}