import { RouletteFisicEntity } from '../entites/roulette-fisic.entity';

export abstract class RouletteFisicRepository {
    abstract create(data: RouletteFisicEntity): Promise<RouletteFisicEntity>;
    abstract findAll(page: number, limit: number): Promise<RouletteFisicEntity [] | []>;
    abstract findById(id: string): Promise<RouletteFisicEntity | null>;
    abstract findManyBy(filter: Record<string, any>): Promise<RouletteFisicEntity [] | []>;
    abstract findOneBy(filter: Record<string, any>, populateFields?: string | string[]): Promise<RouletteFisicEntity | null>;
    abstract update(id: string, data: Partial<RouletteFisicEntity>): Promise<RouletteFisicEntity | null>;
    abstract remove(id: string): Promise<RouletteFisicEntity | null>;
}