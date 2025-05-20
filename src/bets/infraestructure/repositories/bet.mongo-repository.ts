import { InjectModel } from '@nestjs/mongoose';
import { BetEntity } from 'src/bets/domain/etities/bet.entity';
import { BetRepository } from 'src/bets/domain/repositories/bet.repository';
import { BetModel } from '../models/bet.model';
import { Model } from 'mongoose';

export class BetMongoRepository implements BetRepository {

    constructor(
        @InjectModel(BetModel.name)
        private readonly betModel: Model<BetModel>
    ) {}

    async create(data: BetEntity): Promise<BetEntity> {
        throw new Error('Method not implemented.');
    }
    async createMany(data: BetEntity[]): Promise<BetEntity[]> {
        return await this.betModel.insertMany(data);
    }
    async findAll(page: number, limit: number): Promise<BetEntity[] | []> {
        return await this.betModel.find();
    }
    findById(id: string): Promise<BetEntity | null> {
        throw new Error('Method not implemented.');
    }
    findByUuid(uuid: string): Promise<BetEntity | null> {
        throw new Error('Method not implemented.');
    }
    findOneBy(filter: Record<string, any>): Promise<BetEntity | null> {
        throw new Error('Method not implemented.');
    }
    findManyBy(filter: Record<string, any>, sort?: Record<string, 1 | -1>, limit?: number): Promise<BetEntity[] | []> {
        throw new Error('Method not implemented.');
    }
    update(id: string, data: Partial<BetEntity>): Promise<BetEntity | null> {
        throw new Error('Method not implemented.');
    }
    updateByUuid(uuid: string, data: Partial<BetEntity>): Promise<BetEntity | null> {
        throw new Error('Method not implemented.');
    }
    async updateMany(filter: Record<string, any>, fields: Record<string, any>): Promise<any> {
        return await this.betModel.updateMany(filter, fields);
    }
    remove(id: string): Promise<BetEntity | null> {
        throw new Error('Method not implemented.');
    }

}