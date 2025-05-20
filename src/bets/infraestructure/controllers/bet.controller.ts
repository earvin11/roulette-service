import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BetUseCases } from 'src/bets/application/bet.use-cases';
import { PayBetsUseCase } from 'src/bets/application/pay-bets.use-case';
import { BetInputInterface } from 'src/shared/interfaces/bet-input.interface';

@Controller('bets')
export class BetController {

    constructor(
        private readonly betUseCases: BetUseCases,
        private readonly payBetsUseCase: PayBetsUseCase,
    ) {}

    @Post()
    async create(@Body() data: BetInputInterface) {
        return await this.betUseCases.processBet(data);
    };

    //TODO: eliminar
    @Post('set-result')
    async setResult(@Body() data: any) {
        const { result, roundUuid } = data;
        return await this.payBetsUseCase.run(roundUuid, +result);
    }

    @Get()
    async findAll() {
        return await this.betUseCases.findAll();
    };
}