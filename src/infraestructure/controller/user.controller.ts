import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { UserDto } from "src/domain/aggregate/user.aggregate";
import { UserService } from "src/domain/service/user.service";
import { User } from "src/domain/entity/user.entity";
import { Category } from "src/domain/entity/category.entity";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers()
    }

    @Get(':id/categories')
    async getUserCategories(@Param('id') userId: string): Promise<Category[]> {
        try {
            return this.userService.getUserCategories(userId)
        } catch(error) {
            throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post()
    async insertUser(@Body() body: UserDto): Promise<void> {
        this.userService.insertUser(body)
    }
}