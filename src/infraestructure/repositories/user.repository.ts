import { Injectable } from '@nestjs/common'
import { UserRepository } from 'src/domain/repository/user.repository';
import { PrismaService } from '../config/prisma.service';
import { User } from 'src/domain/entity/user.entity';

@Injectable()
export class UserRepo implements UserRepository {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany()
        return users.map((user) => ({
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.first_name
        } as User))
    }

    async find(userId: string): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        if (user) {
            return {
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            }
        }
    }

    async insert(user:User): Promise<void> {
        await this.prisma.user.create({
            data: {
                email: user.email,
                first_name: user.firstName,
                last_name: user.lastName,
                password: user.password
            }
        })
    }
}