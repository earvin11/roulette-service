import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModel, TransactionSchema } from './models/transaction.model';
import { TransactionMongoRepository } from './repositories/transaction.mongo-repository';
import { TransactionUseCases } from '../application/transaction.use-cases';
import { TransactionRepository } from '../domain/repositories/transaction.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TransactionModel.name,
        schema: TransactionSchema
      }
    ]),
  ],
  controllers: [],
  providers: [
    TransactionMongoRepository,
    TransactionUseCases,
    {
      provide: TransactionRepository,
      useExisting: TransactionMongoRepository
    }
  ],
  exports: [TransactionUseCases],
})
export class TransactionModule {}