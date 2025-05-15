import { Injectable } from '@nestjs/common';
import { RouletteEntity } from '../domain/entites/roulette.entity';
import { Roulette } from '../domain/implementations/roulette.value';
import { RouletteRepository } from '../domain/repositories/roulette.repository';

@Injectable()
export class RouletteUseCases {
    constructor(
        private readonly rouletteRepository: RouletteRepository,
    ) {}

    public create = async(data: RouletteEntity) => {
        const newData = new Roulette(data);
        return await this.rouletteRepository.create(newData);
    };

    public findAll = async(page: number = 1, limit: number = 10, populateFields?: string | string[]) => {
        const data = await this.rouletteRepository.findAll(page, limit, populateFields);
        return data;
    };

    public findById = async(id: string, populateFields?: string | string[]) => {
        const data = await this.rouletteRepository.findById(id, populateFields);
        return data;
    };

    public findByUuid = async(uuid: string, populateFields?: string | string[]) => {
        return await this.rouletteRepository.findByUuid(uuid, populateFields);
    };

    public findOneBy = async(filter: Record<string, any>, populateFields?: string | string[]) => {
        const data = await this.rouletteRepository.findOneBy(filter, populateFields);
        return data;
    };

    public findManyBy = async(filter: Record<string, any>, populateFields?: string | string[]) => {
        const data = await this.rouletteRepository.findManyBy(filter, populateFields);
        return data;
    };

    public update = async(id: string, dataToUpdate: Partial<RouletteEntity>) => {
        const data = await this.rouletteRepository.update(id, dataToUpdate);
        return data;
    };

    public updateOne = async(uuid: string, dataToUpdate: Partial<RouletteEntity>) => {
        const data = await this.rouletteRepository.updateByUuid(uuid, dataToUpdate);
        return data;
    };

    public remove = async(id: string) => {
        const data = await this.rouletteRepository.remove(id);
        return data;
    };
}