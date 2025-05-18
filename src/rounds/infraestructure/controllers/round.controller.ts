import { Body, Controller, Put } from '@nestjs/common';
import { CreateOrEndRoundDto } from '../dtos/create-round.dto';
import { RoundQueueService } from '../queues/round-queue.service';

@Controller('round')
export class RoundController {
    constructor(
        private readonly roundQueueService: RoundQueueService,
    ) {}

    @Put('start')
    async start(@Body() createRoundDto: CreateOrEndRoundDto) {
        await this.roundQueueService.createRound(createRoundDto);
        return { message: 'Round processing' };
    }

    @Put('end')
    async end(@Body() endRoundDto: CreateOrEndRoundDto) {
        await this.roundQueueService.endRound(endRoundDto);
        return { message: 'End round' };
    }
}
