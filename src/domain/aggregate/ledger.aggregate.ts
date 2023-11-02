import { IsBoolean, IsDate, IsDateString, IsEnum, IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Operation } from "../entity/operation.entity";

export class CreateLedgerRegisterDto {
    @IsString()
    @IsNotEmpty()
    accountId: string
    
    @IsString()
    @IsNotEmpty()
    categoryId: string

    @IsIn(['REVENUE','EXPENSE','DEBT'])
    @IsNotEmpty()
    operation: Operation

    @IsNumber()
    @IsNotEmpty()
    value: number

    @IsDateString()
    @IsNotEmpty()
    date: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsBoolean()
    @IsNotEmpty()
    paid: boolean
}

export class UpdateLedgerRegisterDto {
    @IsString()
    @IsNotEmpty()
    categoryId: string

    @IsNumber()
    @IsNotEmpty()
    value: number

    @IsDateString()
    @IsNotEmpty()
    date: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsBoolean()
    @IsNotEmpty()
    paid: boolean
}

