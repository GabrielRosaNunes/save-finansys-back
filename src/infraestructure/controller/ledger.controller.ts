import { Body, Controller, Post, Put,Param,Delete } from "@nestjs/common";
import { CreateLedgerRegisterDto, UpdateLedgerRegisterDto } from "src/domain/aggregate/ledger.aggregate";
import { LedgerService } from "src/domain/service/ledger.service";

@Controller('ledger')
export class LedgerController {
    constructor(private ledgerService:LedgerService) {}
    @Post()
    async insertLedger(@Body() body: CreateLedgerRegisterDto) {
        await this.ledgerService.insertLedger(body)
    }

    @Put(':id')
    async updateLedger(@Body() body: UpdateLedgerRegisterDto, @Param('id') ledgerId:string) {
        await this.ledgerService.updateLedger(ledgerId,body)
    }

    @Delete(':id')
    async deleteLedger(@Param('id') ledgerId: string) {
        await this.ledgerService.deleteLedger(ledgerId)
    }
}