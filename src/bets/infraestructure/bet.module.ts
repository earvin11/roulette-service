import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BetModel, BetSchema } from './models/bet.model';
import { BetMongoRepository } from './repositories/bet.mongo-repository';
import { BetUseCases } from '../application/bet.use-cases';
import { BetRepository } from '../domain/repositories/bet.repository';
import { BetController } from './controllers/bet.controller';
import { BullModule } from '@nestjs/bullmq';
import { QueueName } from 'src/shared/enums/queues-names.enum';
import { PayBetsUseCase } from '../application/pay-bets.use-case';
import { PayBetsProcessor } from './queues/processors/pay-bets.processor';
import { EventsModule } from 'src/events/infraestructure/events.module';
import { BetQueueService } from './queues/bets-queue.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BetModel.name,
        schema: BetSchema,
      },
    ]),
    BullModule.registerQueue(
      { name: QueueName.PAY_BETS }
    ),
    EventsModule,
  ],
  controllers: [BetController],
  providers: [
    BetMongoRepository,
    BetUseCases,
    PayBetsUseCase,
    PayBetsProcessor,
    BetQueueService,
    {
      provide: BetRepository,
      useExisting: BetMongoRepository,
    },
  ],
  exports: [BetUseCases],
})
export class BetModule {}