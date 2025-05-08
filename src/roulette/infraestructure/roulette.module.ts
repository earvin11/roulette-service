import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouletteFisicModel, RouletteFisicSchema } from './models/roulette-fisic.model';
import { RouletteModel, RouletteSchema } from './models/roulette.model';
import { RouletteFisicUseCases } from '../application/roulette-fisic.use-cases';
import { RouletteUseCases } from '../application/roulette.use-cases';
import { RouletteFisicRepository } from '../domain/repositories/roulette-fisic.repository';
import { RouletteRepository } from '../domain/repositories/roulette.repository';
import { RouletteFisicMongoRepository } from './repositories/roulette-fisic.mongo-repository';
import { RouletteMongoRepository } from './repositories/roulette.mongo-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RouletteFisicModel.name,
        schema: RouletteFisicSchema,
      },
      {
        name: RouletteModel.name,
        schema: RouletteSchema
      }
    ]),
  ],
  controllers: [],
  providers: [
    RouletteFisicUseCases,
    RouletteUseCases,
    RouletteFisicMongoRepository,
    RouletteMongoRepository,
    {
      provide: RouletteFisicRepository,
      useExisting: RouletteFisicMongoRepository,
    },
    {
        provide: RouletteRepository,
        useExisting: RouletteMongoRepository
    }
  ],
  exports: [RouletteFisicRepository, RouletteMongoRepository, RouletteUseCases, RouletteFisicUseCases],
})
export class RouletteModule {}