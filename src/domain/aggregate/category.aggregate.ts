import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    name: string
}

export class UpdateCategoryDto {
    @IsNotEmpty()
    name: string
}
