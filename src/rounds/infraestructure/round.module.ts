import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoundModel, RoundSchema } from './models/round.model';
import { RoundMongoRepository } from './repositories/round.mongo-repository';
import { RoundRepository } from '../domain/repositories/round.repository';
import { RouletteModule } from 'src/roulette/infraestructure/roulette.module';
import { RoundController } from './controllers/round.controller';
import { CreateRoundUseCase } from '../application/create-round.use-case';
import { RoundUseCases } from '../application/round.use-cases';
import { DateServiceModule } from 'src/date-service/infraestructure/date-service.module';
import { EndRoundUseCases } from '../application/end-round.use-case';
import { EventsModule } from 'src/events/infraestructure/events.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RoundModel.name,
        schema: RoundSchema,
      },
    ]),
    RouletteModule,
    DateServiceModule,
    EventsModule
  ],
  controllers: [RoundController],
  providers: [
    RoundMongoRepository,
    RoundUseCases,
    CreateRoundUseCase,
    EndRoundUseCases,
    {
      provide: RoundRepository,
      useExisting: RoundMongoRepository,
    },
  ],
  exports: [],
})
export class RoundModule {}
