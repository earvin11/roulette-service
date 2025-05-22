import { Injectable } from "@nestjs/common";
import { TransactionEntity } from "../domain/entities/transaction.entity";
import { Transaction } from "../domain/implementations/transaction.value";
import { TransactionRepository } from "../domain/repositories/transaction.repository";

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