import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../domain/repositories/transaction.repository';
import { TransactionEntity } from '../domain/entities/transaction.entity';
import { Transaction } from '../domain/implementations/transaction.value';

@Injectable()
export class TransactionUseCases {
    constructor(
        private readonly transactionRepository: TransactionRepository
    ) {}

    public create = async(data: TransactionEntity) => {
        const newData = new Transaction(data);
        return await this.transactionRepository.create(newData);
    };

}