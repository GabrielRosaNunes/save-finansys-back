import { IsNotEmpty } from "class-validator";

export class CreateAccountDto {
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    name: string
}

export class UpdateAccountDto {
    @IsNotEmpty()
    name:string
}