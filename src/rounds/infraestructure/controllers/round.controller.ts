import { Body, Controller, Put } from '@nestjs/common';
import { CreateRoundDto } from '../dtos/create-round.dto';
import { CreateRoundUseCase } from 'src/rounds/application/create-round.use-case';

@Controller('round')
export class RoundController {
    constructor(
        private readonly createRoundUseCases: CreateRoundUseCase
    ) {}

    @Put('start')
    async start(@Body() createRoundDto: CreateRoundDto) {
        return await this.createRoundUseCases.run(createRoundDto);
    }
}
