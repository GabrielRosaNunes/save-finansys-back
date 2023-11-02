import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepo } from "src/infraestructure/repositories/category.repository";
import { Category } from "../entity/category.entity";
import { CreateCategoryDto, UpdateCategoryDto } from "../aggregate/category.aggregate";
import { UserRepo } from "src/infraestructure/repositories/user.repository";

@Injectable()
export class CategoryService {
    constructor(
        private categoryRepo: CategoryRepo,
        private userRepo: UserRepo
    ) {}

    async insertCategory(category: CreateCategoryDto): Promise<void> {
        const user = this.userRepo.find(category.userId)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        await  this.categoryRepo.insert({
            name: category.name,
            userId: category.userId
        })
    }

    async updateCategory(categoryId:string,category: UpdateCategoryDto): Promise<void> {
        const categoryFound = await this.categoryRepo.find(categoryId)

        if (!categoryFound) {
            throw new NotFoundException("Category not found")
        }

        await this.categoryRepo.update(categoryId,{
            name: category.name
        })
    }

    async deleteCategory(categoryId: string): Promise<void> {
        await this.categoryRepo.delete(categoryId)
    }
}