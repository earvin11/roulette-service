import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roulette } from '../models/roulette.model';
import { RouletteRepository } from 'src/roulette/domain/repositories/roulette.repository';
import { RouletteEntity } from 'src/roulette/domain/entites/roulette.entity';

@Injectable()
export class RouletteMongoRepository implements RouletteRepository {
    constructor(
        @InjectModel(Roulette.name)
        private readonly operatorRoulette: Model<Roulette>
    ) {}
    
    public create = async(data: RouletteEntity): Promise<RouletteEntity> => {
        const newData = await this.operatorRoulette.create(data);
        return await newData.save();
    }
    public findAll = async(page: number, limit: number, populateFields?: string | string[]): Promise<RouletteEntity[] | []> => {
        let query = this.operatorRoulette.find().skip(page).limit(limit);

        if (populateFields) {
            query = query.populate(populateFields);
        }
    
        const data = await query.exec();
        return data;
    }
    public findById = async(id: string, populateFields?: string | string[]): Promise<RouletteEntity | null> => {
        let query = this.operatorRoulette.findById(id);
        if (populateFields) {
            query = query.populate(populateFields);
        }
    
        const data = await query.exec();
        return data;
    }
    public findByUuid = async(uuid: string, populateFields?: string | string[]): Promise<RouletteEntity | null> => {
        let query = this.operatorRoulette.findOne({ uuid });
        if (populateFields) {
            query = query.populate(populateFields);
        }
    
        const data = await query.exec();
        return data;
    }
    public findOneBy = async(filter: Record<string, any>, populateFields?: string | string[]): Promise<RouletteEntity | null> => {
        let query = this.operatorRoulette.findOne(filter);
                       
        // Si hay campos para popular
        if (populateFields) {
            query = query.populate(populateFields);
        }
    
        const data = await query.exec();
        return data;
    }
    public findManyBy = async(filter: Record<string, any>, populateFields?: string | string[]): Promise<RouletteEntity[] | []> => {
        let query = this.operatorRoulette.find(filter);
        if (populateFields) {
            query = query.populate(populateFields);
        }
    
        const data = await query.exec();
        return data;
    }
    public update = async(id: string, data: Partial<RouletteEntity>): Promise<RouletteEntity | null> => {
        const resp = await this.operatorRoulette.findByIdAndUpdate(id, data);
        return resp;
    }
    public updateByUuid = async(uuid: string, data: Partial<RouletteEntity>): Promise<RouletteEntity | null> => {
        const resp = await this.operatorRoulette.findOneAndUpdate({ uuid }, data);
        return resp;
    }
    public remove = async(id: string): Promise<RouletteEntity | null> => {
        const resp = await this.operatorRoulette.findByIdAndDelete(id);
        return resp;
    }
}