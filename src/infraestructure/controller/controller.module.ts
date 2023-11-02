import { Module } from "@nestjs/common/decorators";
import { UserController } from "./user.controller";
import { DomainModule } from "src/domain/domain.module";
import { CategoryController } from "./category.controller";
import { AccountController } from "./account.controller";
import { LedgerController } from "./ledger.controller";

@Module({
    imports: [DomainModule],
    controllers:[UserController,CategoryController,AccountController,LedgerController],
})
export class ControllerModule {

}