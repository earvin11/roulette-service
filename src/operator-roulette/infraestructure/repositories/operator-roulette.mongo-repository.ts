import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperatorRoulette } from '../models/operator-roulette.model';
import { OperatorRouletteRepository } from 'src/operator-roulette/domain/repositories/operator-roulette.repository';
import { OperatorRouletteEntity } from 'src/operator-roulette/domain/entites/operator-roulette.entity';

@Injectable()
export class OperatorRouletteMongoRepository implements OperatorRouletteRepository {
    constructor(
        @InjectModel(OperatorRoulette.name)
        private readonly operatorRoulette: Model<OperatorRoulette>
    ) {}
    public create = async(data: OperatorRouletteEntity): Promise<OperatorRouletteEntity> => {
        const newData = await this.operatorRoulette.create(data);
        return await newData.save();
    }
    public findAll = async(page: number, limit: number, populateFields?: string | string[]): Promise<OperatorRouletteEntity[] | []> => {
        let query = this.operatorRoulette.find().skip(page).limit(limit);

        if (populateFields) {
            query = query.populate(populateFields);
        }
    
        const data = await query.exec();
        return data;
    }
    public findById = async(id: string, populateFields?: string | string[]): Promise<OperatorRouletteEntity | null> => {
        let query = this.operatorRoulette.findById(id);
        if (populateFields) {
            query = query.populate(populateFields);
        }
    
        const data = await query.exec();
        return data;
    }
    public findOneBy = async(filter: Record<string, any>, populateFields?: string | string[]): Promise<OperatorRouletteEntity | null> => {
        let query = this.operatorRoulette.findOne(filter);
                       
        // Si hay campos para popular
        if (populateFields) {
            query = query.populate(populateFields);
        }
    
        const data = await query.exec();
        return data;
    }
    public findManyBy = async(filter: Record<string, any>, populateFields?: string | string[]): Promise<OperatorRouletteEntity[] | []> => {
        let query = this.operatorRoulette.find(filter);
        if (populateFields) {
            query = query.populate(populateFields);
        }
    
        const data = await query.exec();
        return data;
    }
    public update = async(id: string, data: Partial<OperatorRouletteEntity>): Promise<OperatorRouletteEntity | null> => {
        const resp = await this.operatorRoulette.findByIdAndUpdate(id, data);
        return resp;
    }
    public updateOne = async(uuid: string, data: Partial<OperatorRouletteEntity>): Promise<OperatorRouletteEntity | null> => {
        const resp = await this.operatorRoulette.findOneAndUpdate({ uuid }, data);
        return resp;
    }
    public remove = async(id: string): Promise<OperatorRouletteEntity | null> => {
        const resp = await this.operatorRoulette.findByIdAndDelete(id);
        return resp;
    }
}