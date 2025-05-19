import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BetUseCases } from 'src/bets/application/bet.use-cases';
import { BetInputInterface } from 'src/shared/interfaces/bet-input.interface';

@Controller('bets')
export class BetController {

    constructor(
        private readonly betUseCases: BetUseCases
    ) {}

    @Post()
    async create(@Body() data: BetInputInterface) {
        return await this.betUseCases.processBet(data);
    };

    @Get()
    async findAll() {
        return await this.betUseCases.findAll();
    };
}