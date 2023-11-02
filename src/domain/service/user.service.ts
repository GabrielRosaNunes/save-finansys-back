import {Injectable, NotFoundException} from '@nestjs/common'
import { UserRepo } from 'src/infraestructure/repositories/user.repository';
import { User } from '../entity/user.entity';
import { UserDto } from '../aggregate/user.aggregate';
import { CategoryRepo } from 'src/infraestructure/repositories/category.repository';
import { Category } from '../entity/category.entity';
import { AccountRepo } from 'src/infraestructure/repositories/account.repository';
import { Account } from '../entity/account.entity';

@Injectable()
export class UserService {
    constructor(
        private userRepo: UserRepo,
        private categoryRepo: CategoryRepo,
        private accountRepo: AccountRepo
    ) {}

    async getUsers(): Promise<User[]> {
        const users = await this.userRepo.getAll()
        return users
    } 

    async getUserCategories(userId: string): Promise<Category[]> {
        const user = await this.userRepo.find(userId)

        if (!user) {
            throw new NotFoundException('User not found')
        }
        
        
        return await this.categoryRepo.listByUser(userId)
    }

    async getUserAccounts(userId: string): Promise<Account[]> {
        const user = await this.userRepo.find(userId)

        if (!user) {
            throw new NotFoundException('User not found')
        }
        
        return await this.accountRepo.getAllByUser(userId)
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