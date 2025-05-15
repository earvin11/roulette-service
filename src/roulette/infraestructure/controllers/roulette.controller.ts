import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RouletteUseCases } from 'src/roulette/application/roulette.use-cases';
import { CreateRouletteDto } from '../dtos/create-roulette.dto';

@Controller('roulettes')
export class RouletteController {

    constructor(
        private readonly rouletteUseCases: RouletteUseCases
    ) {}

    @Post()
    async create(@Body() createRouletteDto: CreateRouletteDto) {
        return await this.rouletteUseCases.create(createRouletteDto);
    };

    @Get()
    async findAll() {
        return await this.rouletteUseCases.findAll();
    };

    @Get(':uuid')
    async findByUuid(@Param('uuid') uuid: string) {
        return await this.rouletteUseCases.findByUuid(uuid);
    };
}
