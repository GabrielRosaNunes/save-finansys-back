import { Module } from "@nestjs/common/decorators";
import { UserController } from "./user.controller";
import { RepositoriesModule } from "../repositories/repositories.module";
import { DomainModule } from "src/domain/domain.module";
import { CategoryController } from "./category.controller";

@Module({
    imports: [DomainModule],
    controllers:[UserController,CategoryController],
})
export class ControllerModule {

}