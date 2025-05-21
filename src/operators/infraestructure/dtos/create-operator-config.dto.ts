import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreateOperatorConfigDto {
    @IsNumber()
    @IsOptional()
    order: number;
    @IsArray()
    currencies: string[];
    @IsNumber()
    @IsPositive()
    @IsOptional()
    pleno?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    semipleno?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    cuadro?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    calle?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    linea?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    columna?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    docena?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    color?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    evenOdd?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    chanceSimple?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    cubre?: number;
    @IsNumber()
    @IsPositive()
    @IsOptional()
    specialCalle?: number;
    @IsOptional()
    @IsBoolean()
    layout?: boolean;
    @IsOptional()
    @IsString()
    template?: string;
    @IsOptional()
    @IsString()
    logo?: string;
};