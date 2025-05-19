import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoundModel, RoundSchema } from './models/round.model';
import { RoundMongoRepository } from './repositories/round.mongo-repository';
import { RoundRepository } from '../domain/repositories/round.repository';
import { RouletteModule } from 'src/roulette/infraestructure/roulette.module';
import { RoundController } from './controllers/round.controller';
import { DateServiceModule } from 'src/date-service/infraestructure/date-service.module';
import { EventsModule } from 'src/events/infraestructure/events.module';
import { RoundQueueService } from './queues/round-queue.service';
import { RoundClosedProcessor, RoundEndProcessor, RoundStartProcessor } from './queues/processors';
import { BullModule } from '@nestjs/bullmq';
import { QueueName } from 'src/shared/enums/queues-names.enum';
import { ClosedRoundUseCase, CreateRoundUseCase, EndRoundUseCase, RoundUseCases } from '../application';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RoundModel.name,
        schema: RoundSchema,
      },
    ]),
    BullModule.registerQueue(
      { name: QueueName.ROUND_START },
      { name: QueueName.ROUND_CLOSED },
      { name: QueueName.ROUND_END }
    ),
    RouletteModule,
    DateServiceModule,
    EventsModule
  ],
  controllers: [RoundController],
  providers: [
    RoundMongoRepository,
    RoundUseCases,
    CreateRoundUseCase,
    ClosedRoundUseCase,
    EndRoundUseCase,
    RoundStartProcessor,
    RoundClosedProcessor,
    RoundEndProcessor,
    RoundQueueService,
    {
      provide: RoundRepository,
      useExisting: RoundMongoRepository,
    },
  ],
  exports: [RoundQueueService],
})
export class RoundModule {}
