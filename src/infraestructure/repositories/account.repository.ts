import { AccountRepository } from "src/domain/repository/account.repository";
import { PrismaService } from "../config/prisma.service";
import { Injectable } from "@nestjs/common";
import { Account } from "src/domain/entity/account.entity";

@Injectable()
export class AccountRepo implements AccountRepository {
    constructor(private prisma: PrismaService) {}
    async find(id: string): Promise<Account> {
        const accountFounded = await this.prisma.account.findFirst({
            where: {
                id
            }
        })

        if (accountFounded) {
            return {
                id: accountFounded.id,
                name: accountFounded.name,
                userId: accountFounded.user_id
            } satisfies Account
        }
    }
    async getAllByUser(userId: string): Promise<Account[]> {
        const userAccounts = await this.prisma.account.findMany({
            where: {
                user_id: userId
            }
        })

        return userAccounts.map(userAccount => ({
            id: userAccount.id,
            name: userAccount.name,
            userId: userAccount.user_id
        }))
    }
    async insert(account: Account): Promise<void> {
        await this.prisma.account.create({
            data: {
                user_id: account.userId,
                name: account.name
            }
        })
    }
    async update(id: string,account:Account): Promise<void> {
        await this.prisma.account.update({
            where: {
                id
            },
            data: {
                name: account.name
            }
        })
    }
    async delete(id:string): Promise<void> {
        await this.prisma.account.delete({
            where: {
                id
            }
        })
    }

    
}