import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateAccountDto, UpdateAccountDto } from "src/domain/aggregate/account.aggregate";
import { AccountService } from "src/domain/service/account.service";


@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Get(':id/ledgers')
    async getAccountLedgers(@Param('id') accountId:string) {
        return await this.accountService.getAccountLedgers(accountId)
    }

    @Post()
    async insertAccount(@Body() body: CreateAccountDto) {
        await this.accountService.insertAccount(body)
    }

    @Put(':id')
    async updateAccount(@Body() body: UpdateAccountDto, @Param("id") accountId: string) {
        await this.accountService.updateAccount(accountId,body)
    }
}