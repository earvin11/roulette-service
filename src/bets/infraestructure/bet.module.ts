import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BetModel, BetSchema } from './models/bet.model';
import { BetMongoRepository } from './repositories/bet.mongo-repository';
import { BetUseCases } from '../application/bet.use-cases';
import { BetRepository } from '../domain/repositories/bet.repository';
import { BetController } from './controllers/bet.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BetModel.name,
        schema: BetSchema,
      },
    ]),
  ],
  controllers: [BetController],
  providers: [
    BetMongoRepository,
    BetUseCases,
    {
      provide: BetRepository,
      useExisting: BetMongoRepository,
    },
  ],
  exports: [BetUseCases],
})
export class BetModule {}