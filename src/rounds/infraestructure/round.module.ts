import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoundModel, RoundSchema } from './models/round.model';
import { RoundMongoRepository } from './repositories/round.mongo-repository';
import { RoundRepository } from '../domain/repositories/round.repository';
import { OperatorRouletteModule } from 'src/operator-roulette/infraestructure/operator-roulette.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RoundModel.name,
        schema: RoundSchema,
      },
    ]),
    OperatorRouletteModule,
  ],
  controllers: [],
  providers: [
    RoundMongoRepository,
    {
      provide: RoundRepository,
      useExisting: RoundMongoRepository,
    },
  ],
  exports: [],
})
export class RoundModule {}
