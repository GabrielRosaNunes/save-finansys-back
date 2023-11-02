import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { UserDto } from "src/domain/aggregate/user.aggregate";
import { UserService } from "src/domain/service/user.service";
import { User } from "src/domain/entity/user.entity";
import { Category } from "src/domain/entity/category.entity";
import { Account } from "src/domain/entity/account.entity";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers()
    }

    @Get(':id/categories')
    async getUserCategories(@Param('id') userId: string): Promise<Category[]> {
        return await this.userService.getUserCategories(userId)
    }

    @Get(':id/accounts')
    async getUserAccounts(@Param('id') userId: string): Promise<Account[]> {
        return await this.userService.getUserAccounts(userId)
    }

    @Post()
    async insertUser(@Body() body: UserDto): Promise<void> {
        this.userService.insertUser(body)
    }
}