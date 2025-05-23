import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreateRouletteDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    providerId: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @Min(1)
    roundDuration: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @Min(1)
    timeToReleaseJack: number;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    jackpot?: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    doubleZero?: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isManualRoulette?: boolean;
};