import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreateRouletteDto {
    @IsString()
    name: string;

    @IsString()
    providerId: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    roundDuration: number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    timeToReleaseJack: number;

    @IsBoolean()
    @IsOptional()
    jackpot?: boolean;

    @IsBoolean()
    @IsOptional()
    doubleZero?: boolean;

    @IsBoolean()
    @IsOptional()
    isManualRoulette?: boolean;
};