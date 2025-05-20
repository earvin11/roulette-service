import { InjectQueue } from'@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { QueueName } from 'src/shared/enums/queues-names.enum';

@Injectable()
export class BetQueueService {
    constructor(
        @InjectQueue(QueueName.PAY_BETS) private readonly payBetsQueue: Queue
    ) {}

    async payBets(jobData: { roundUuid: string, result: number }) {
        return await this.payBetsQueue.add(QueueName.PAY_BETS, jobData);
    };
}