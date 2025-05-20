import { Injectable } from '@nestjs/common';
import { OperatorConfigRepository } from '../domain/repositories/operator-config.repository';
import { OperatorConfigEntity } from '../domain/entites/operator-config.entity';
import { OperatorConfig } from '../domain/implementations/operator-config.value';

@Injectable()
export class OperatorConfigUseCases {
    constructor(
        private readonly operatorConfigRepository: OperatorConfigRepository
    ) {}

    public create = async(data: OperatorConfigEntity) => {
        const newData = new OperatorConfig(data);
        return await this.operatorConfigRepository.create(newData);
    };

    public findByOperator = async(operatorId: string) => {
        return await this.operatorConfigRepository.findByOperator(operatorId);
    };

    public updateByOperator = async(operatorId: string, data: Partial<OperatorConfigEntity>) => {
        return await this.operatorConfigRepository.updateByOperator(operatorId, data);
    };
}