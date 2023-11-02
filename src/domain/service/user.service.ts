import {Injectable} from '@nestjs/common'
import { UserRepo } from 'src/infraestructure/repositories/user.repository';
import { User } from '../entity/user.entity';
import { UserDto } from '../aggregate/user.aggregate';
import { CategoryRepo } from 'src/infraestructure/repositories/category.repository';
import { Category } from '../entity/category.entity';

@Injectable()
export class UserService {
    constructor(
        private userRepo: UserRepo,
        private categoryRepo: CategoryRepo
    ) {}

    async getUsers(): Promise<User[]> {
        const users = await this.userRepo.getAll()
        return users
    } 

    async getUserCategories(userId: string): Promise<Category[]> {
        return await this.categoryRepo.listByUser(userId)
    }

    async insertUser(user: UserDto): Promise<void> {
        this.userRepo.insert({
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
        })
    }
}