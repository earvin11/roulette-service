import { Body, Controller, Put } from '@nestjs/common';
import { CreateOrEndRoundDto } from '../dtos/create-round.dto';
import { CreateRoundUseCase } from 'src/rounds/application/create-round.use-case';
import { EndRoundUseCases } from 'src/rounds/application/end-round.use-case';

@Controller('round')
export class RoundController {
    constructor(
        private readonly createRoundUseCases: CreateRoundUseCase,
        private readonly endRoundUseCases: EndRoundUseCases,
    ) {}

    @Put('start')
    async start(@Body() createRoundDto: CreateOrEndRoundDto) {
        return await this.createRoundUseCases.run(createRoundDto);
    }

    @Put('end')
    async end(@Body() endRoundDto: CreateOrEndRoundDto) {
        return await this.endRoundUseCases.run(endRoundDto);
    }
}
