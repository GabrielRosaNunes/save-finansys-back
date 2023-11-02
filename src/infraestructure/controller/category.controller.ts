import { Body, Controller, Delete, HttpException, HttpStatus, Param, Post,Put } from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "src/domain/aggregate/category.aggregate";
import { CategoryService } from "src/domain/service/category.service";


@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService) {}

    @Post()
    async insertCategory(@Body() body: CreateCategoryDto): Promise<void> {

        await this.categoryService.insertCategory(body)
    }

    @Put(':id')
    async updateCategory(@Param('id') id: string,@Body() body:UpdateCategoryDto): Promise<void> {
        
        await this.categoryService.updateCategory(id,body)
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string): Promise<void> {
        await this.categoryService.deleteCategory(id)
    }
}