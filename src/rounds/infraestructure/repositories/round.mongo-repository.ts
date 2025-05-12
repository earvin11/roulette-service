import { RoundEntity } from 'src/rounds/domain/entities/round.entity';
import { RoundRepository } from '../../domain/repositories/round.repository';
import { InjectModel } from '@nestjs/mongoose';
import { RoundModel } from '../models/round.model';
import { Model } from 'mongoose';

export class RoundMongoRepository implements RoundRepository {

    constructor(
        @InjectModel(RoundModel.name)
        private readonly roundModel: Model<RoundModel>
    ) {}

    create(data: RoundEntity): Promise<RoundEntity> {
        throw new Error('Method not implemented.');
    }
    findAll(page: number, limit: number): Promise<RoundEntity[] | []> {
        throw new Error('Method not implemented.');
    }
    findById(id: string): Promise<RoundEntity | null> {
        throw new Error('Method not implemented.');
    }
    findOneBy(filter: Record<string, any>, fields?: String, sort?: Record<string, 1 | -1>): Promise<RoundEntity | null> {
        throw new Error('Method not implemented.');
    }
    findManyBy(filter: Record<string, any>, fields?: String, sort?: Record<string, 1 | -1>, limit?: number): Promise<RoundEntity[] | []> {
        throw new Error('Method not implemented.');
    }
    update(id: string, data: Partial<RoundEntity>): Promise<RoundEntity | null> {
        throw new Error('Method not implemented.');
    }
    remove(id: string): Promise<RoundEntity | null> {
        throw new Error('Method not implemented.');
    }
    findFilteredRounds(filter: Record<string, any>, page: number, limit: number): Promise<{ rounds: RoundEntity[]; total: number; }> {
        throw new Error('Method not implemented.');
    }
    findByIdNumber(identifierNumber: string): Promise<RoundEntity[] | []> {
        throw new Error('Method not implemented.');
    }
    findByIdNumberWithCountBets(identifierNumber: string): Promise<{ round: RoundEntity; totalBets: number; }[] | []> {
        throw new Error('Method not implemented.');
    }
}