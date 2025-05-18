import { Injectable } from '@nestjs/common';
import { Queue, JobOptions } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { CreateOrEndRoundDto } from '../dtos/create-round.dto';
import { QueueName } from 'src/shared/enums/queues-names.enum';

@Injectable()
export class RoundQueueService {
  constructor(
    @InjectQueue(QueueName.ROUND_START) private readonly roundQueue: Queue,
  ) {}

  async createRound(jobData: CreateOrEndRoundDto, options?: JobOptions) {
    await this.roundQueue.add(QueueName.ROUND_START, jobData, options);
  }
}