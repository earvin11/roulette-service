import { RouletteFisicEntity } from '../domain/entites/roulette-fisic.entity';
import { RouletteFisic } from '../domain/implementations/roulette-fisic.value';
import { RouletteFisicRepository } from '../domain/repositories/roulette-fisic.repository';

export class RouletteFisicUseCases {
    constructor(
        private readonly rouletteFisicRepository: RouletteFisicRepository
    ) {}

    public create = async(data: RouletteFisicEntity) => {
        const newData = new RouletteFisic(data);
        return await this.rouletteFisicRepository.create(newData);
    };

    public findAll = async(page: number = 1, limit: number = 10) => {
        const data = await this.rouletteFisicRepository.findAll(page, limit);
        return data;
    };

    public findById = async(id: string) => {
        const data = await this.rouletteFisicRepository.findById(id);
        return data;
    };

    public findOneBy = async(filter: Record<string, any>, populateFields?: string | string[]) => {
        const data = await this.rouletteFisicRepository.findOneBy(filter, populateFields);
        return data;
    };

    public findManyBy = async(filter: Record<string, any>) => {
        const data = await this.rouletteFisicRepository.findManyBy(filter);
        return data;
    };

    public update = async(id: string, data: Partial<RouletteFisicEntity>) => {
        const dataUpdate = await this.rouletteFisicRepository.update(id, data);
        return dataUpdate;
    };

    public remove = async(id: string) => {
        const data = await this.rouletteFisicRepository.remove(id);
        return data;
    };
}