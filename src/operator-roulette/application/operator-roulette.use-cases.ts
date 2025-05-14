import { OperatorRouletteEntity } from '../domain/entites/operator-roulette.entity';
import { OperatorRoulette } from '../domain/implementations/operator-roulette.value';
import { OperatorRouletteRepository } from '../domain/repositories/operator-roulette.repository';

export class OperatorRouletteUseCases {
    constructor(
        private readonly operatorRouletteRepository: OperatorRouletteRepository,
    ) {}

    public create = async(data: OperatorRouletteEntity) => {
        const newData = new OperatorRoulette(data);
        return await this.operatorRouletteRepository.create(newData);
    };

    public findAll = async(page: number = 1, limit: number = 10, populateFields?: string | string[]) => {
        const data = await this.operatorRouletteRepository.findAll(page, limit, populateFields);
        return data;
    };

    public findById = async(id: string, populateFields?: string | string[]) => {
        const data = await this.operatorRouletteRepository.findById(id, populateFields);
        return data;
    };

    public findOneBy = async(filter: Record<string, any>, populateFields?: string | string[]) => {
        const data = await this.operatorRouletteRepository.findOneBy(filter, populateFields);
        return data;
    };

    public findManyBy = async(filter: Record<string, any>, populateFields?: string | string[]) => {
        const data = await this.operatorRouletteRepository.findManyBy(filter, populateFields);
        return data;
    };

    public update = async(id: string, dataToUpdate: Partial<OperatorRouletteEntity>) => {
        const data = await this.operatorRouletteRepository.update(id, dataToUpdate);
        return data;
    };

    public updateOne = async(uuid: string, dataToUpdate: Partial<OperatorRouletteEntity>) => {
        const data = await this.operatorRouletteRepository.updateByUuid(uuid, dataToUpdate);
        return data;
    }

    public remove = async(id: string) => {
        const data = await this.operatorRouletteRepository.remove(id);
        return data;
    };
}