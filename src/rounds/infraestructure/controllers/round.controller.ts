import { Body, Controller, Put } from '@nestjs/common';
import { CreateOrEndRoundDto } from '../dtos/create-round.dto';
import { CreateRoundUseCase } from 'src/rounds/application/create-round.use-case';
import { EndRoundUseCases } from 'src/rounds/application/end-round.use-case';
import { RoundQueueService } from '../queues/round-queue.service';

@Controller('round')
export class RoundController {
    constructor(
        private readonly createRoundUseCases: CreateRoundUseCase,
        private readonly endRoundUseCases: EndRoundUseCases,
        private readonly roundQueueService: RoundQueueService,
    ) {}

    @Put('start')
    async start(@Body() createRoundDto: CreateOrEndRoundDto) {
        await this.roundQueueService.createRound(createRoundDto);
        return { message: 'Round processing' };
        // return await this.createRoundUseCases.run(createRoundDto);
    }

    @Put('end')
    async end(@Body() endRoundDto: CreateOrEndRoundDto) {
        return await this.endRoundUseCases.run(endRoundDto);
    }
}
