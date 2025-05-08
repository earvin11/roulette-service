import { InjectModel } from '@nestjs/mongoose';
import { RouletteFisicEntity } from 'src/roulette/domain/entites/roulette-fisic.entity';
import { RouletteFisicRepository } from 'src/roulette/domain/repositories/roulette-fisic.repository';
import { RouletteFisicModel } from '../models/roulette-fisic.model';
import { Model } from 'mongoose';

export class RouletteFisicMongoRepository implements RouletteFisicRepository {
    constructor(
        @InjectModel(RouletteFisicModel.name)
        private readonly rouletteFisicModel: Model<RouletteFisicModel>,
    ) {}

    async create(data: RouletteFisicEntity): Promise<RouletteFisicEntity> {
        const newData = await this.rouletteFisicModel.create(data);
        return await newData.save();
    }
    public findAll = async (page: number, limit: number): Promise<RouletteFisicEntity[] | []> => {
        const data = await this.rouletteFisicModel.find().skip(page).limit(limit);
        return data;
    }
    public findById = async(id: string): Promise<RouletteFisicEntity | null> => {
        const data = await this.rouletteFisicModel.findById(id);
        return data;
    }
    public findManyBy = async(filter: Record<string, any>): Promise<RouletteFisicEntity[] | []> => {
        const data = await this.rouletteFisicModel.find(filter);
        return data;
    }
    public findOneBy = async(filter: Record<string, any>, populateFields?: string | string[]): Promise<RouletteFisicEntity | null> => {
        let query = this.rouletteFisicModel.findOne(filter);

        // Si se proporcionan campos para popular, los agregamos a la consulta
        if (populateFields) {
            query = query.populate(populateFields);
        }
    
        const data = await query.exec();
        return data;
    }
    public update = async(id: string, data: Partial<RouletteFisicEntity>): Promise<RouletteFisicEntity | null> => {
        const dataUpdate = await this.rouletteFisicModel.findByIdAndUpdate(id, data, { new: true });
        return dataUpdate;
    }
    public remove = async(id: string): Promise<RouletteFisicEntity | null> => {
        console.log({ id })
        throw new Error("Method not implemented.");
    }
}