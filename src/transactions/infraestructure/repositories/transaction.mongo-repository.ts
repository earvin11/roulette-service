import { InjectModel } from '@nestjs/mongoose';
import { TransactionModel } from '../models/transaction.model';
import { Model } from 'mongoose';
import { TransactionRepository } from 'src/transactions/domain/repositories/transaction.repository';
import { TransactionEntity } from 'src/transactions/domain/entities/transaction.entity';

export class TransactionMongoRepository implements TransactionRepository {
    constructor(
        @InjectModel(TransactionModel.name)
        private readonly transactionModel: Model<TransactionModel>
    ) {}
    async create(data: TransactionEntity): Promise<TransactionEntity> {
        const newData = await this.transactionModel.create(data);
        return await newData.save();
    }
    findAll(): Promise<TransactionEntity[] | []> {
        throw new Error('Method not implemented.');
    }
    findByUuid(uuid: string): Promise<TransactionEntity | null> {
        throw new Error('Method not implemented.');
    }
    findOneBy(filter: Record<string, any>): Promise<TransactionEntity | null> {
        throw new Error('Method not implemented.');
    }
    findManyBy(filter: Record<string, any>): Promise<TransactionEntity[] | []> {
        throw new Error('Method not implemented.');
    }
    remove(uuid: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

}