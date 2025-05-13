import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperatorRoulette, OperatorRouletteSchema } from './models/operator-roulette.model';
import { OperatorRouletteMongoRepository } from './repositories/operator-roulette.mongo-repository';
import { OperatorRouletteRepository } from '../domain/repositories/operator-roulette.repository';
import { OperatorRouletteUseCases } from '../application/operator-roulette.use-cases';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OperatorRoulette.name,
        schema: OperatorRouletteSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    OperatorRouletteMongoRepository,
    OperatorRouletteUseCases,
    {
      provide: OperatorRouletteRepository,
      useExisting: OperatorRouletteMongoRepository,
    },
  ],
  exports: [OperatorRouletteUseCases],
})
export class OperatorRouletteModule {}