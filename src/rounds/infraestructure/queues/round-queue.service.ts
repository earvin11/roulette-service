import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { CreateOrEndRoundDto } from '../dtos/create-round.dto';
import { QueueName } from 'src/shared/enums/queues-names.enum';

@Injectable()
export class RoundQueueService {
  constructor(
    @InjectQueue(QueueName.ROUND_START) private readonly roundStartQueue: Queue,
    @InjectQueue(QueueName.ROUND_UPDATE) private readonly roundClosedQueue: Queue,
    @InjectQueue(QueueName.ROUND_END) private readonly roundEndQueue: Queue,
  ) {}

  async createRound(jobData: CreateOrEndRoundDto) {
    return await this.roundStartQueue.add(QueueName.ROUND_START, jobData); 
  }

  async closeRound(roundId: string) {
    return await this.roundClosedQueue.add(QueueName.ROUND_UPDATE, roundId);
  }

  async endRound(jobData: CreateOrEndRoundDto) {
    return await this.roundEndQueue.add(QueueName.ROUND_END, jobData);
  }
}