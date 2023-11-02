import { Injectable, NotFoundException } from "@nestjs/common";
import { AccountRepo } from "src/infraestructure/repositories/account.repository";
import { UserRepo } from "src/infraestructure/repositories/user.repository";
import { CreateAccountDto, UpdateAccountDto } from "../aggregate/account.aggregate";

@Injectable()
export class AccountService {
    constructor(
        private userRepo: UserRepo,
        private accountRepo: AccountRepo
    ) {}

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
}