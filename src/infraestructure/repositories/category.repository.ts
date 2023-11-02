import { Injectable } from "@nestjs/common";
import { Category } from "src/domain/entity/category.entity";
import { CategoryRepository } from "src/domain/repository/category.repository";
import { PrismaService } from "../config/prisma.service";


@Injectable()
export class CategoryRepo  implements CategoryRepository {
    constructor(private prisma: PrismaService) {}

    async find(id: string): Promise<Category> {
        return await this.prisma.category.findFirst({
            where: {
                id
            }
        })
    }

    async listByUser(userId: string): Promise<Category[]> {
        const categories = await this.prisma.category.findMany({
            where: {
                user_id: userId
            }
        })

        return categories.map(category => ({
            id: category.id,
            name: category.name,
            userId: category.user_id
        }))
    }

    async insert(category: Category): Promise<void> {
        await this.prisma.category.create({
            data: {
               user_id: category.userId,
               name: category.name
            } 
        })
    }
    async update(id:string,category: Category): Promise<void> {
        await this.prisma.category.update({
            where: {
                id: id
            },
            data: {
                name: category.name
            }
        })
    }
    async delete(id:string): Promise<void> {
        await this.prisma.category.delete({
            where: {
                id: id
            }
        })
    }
}