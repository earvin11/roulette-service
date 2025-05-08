// import RouletteModel from "../models/roulette.model";

import { InjectModel } from '@nestjs/mongoose';
import { RouletteEntity } from 'src/roulette/domain/entites/roulette.entity';
import { RouletteRepository } from 'src/roulette/domain/repositories/roulette.repository';
import { RouletteModel } from '../models/roulette.model';
import { Model } from 'mongoose';

export class RouletteMongoRepository implements RouletteRepository {
    constructor(
        @InjectModel(RouletteModel.name)
        private readonly rouletteModel: Model<RouletteModel>
    ) {}

    public create = async(data: RouletteEntity): Promise<any> => {
        const newData = await this.rouletteModel.create(data);
        return await newData.save();
    }
    public findAll = async(page: number, limit: number, filter?: Record<string, any>): Promise<RouletteEntity[] | []> => {
        const data = await this.rouletteModel
            .find({ ...filter })
            .skip(page)
            .limit(limit);
        return data;
    }
    public findById = async(id: string): Promise<RouletteEntity | null> => {
        const data = await this.rouletteModel.findById(id);
        return data;
    }
    public findManyBy = async(filter: Record<string, any>): Promise<RouletteEntity[] | []> => {
        const data = await this.rouletteModel.find(filter);
        return data;
    }
    public findOneBy = async(filter: Record<string, any>): Promise<RouletteEntity | null> => {
        const data = await this.rouletteModel.findOne(filter);
        return data;
    }
    public update = async(id: string, data: Partial<RouletteEntity>): Promise<RouletteEntity | null> => {
        const dataUpdate = await this.rouletteModel.findByIdAndUpdate(id, data, { new: true });
        return dataUpdate;
    }
    public remove = async(id: string): Promise<RouletteEntity | null> => {
        console.log({ id })
        throw new Error("Method not implemented.");
    }
}