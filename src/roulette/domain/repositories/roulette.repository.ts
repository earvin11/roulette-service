import { RouletteEntity } from '../entites/roulette.entity';

export abstract class RouletteRepository {
    abstract create(data: RouletteEntity): Promise<RouletteEntity>;
    abstract findAll(page: number, limit: number, filter?: Record<string, any>): Promise<RouletteEntity [] | []>;
    abstract findById(id: string): Promise<RouletteEntity | null>;
    abstract findManyBy(filter: Record<string, any>): Promise<RouletteEntity [] | []>;
    abstract findOneBy(filter: Record<string, any>): Promise<RouletteEntity | null>;
    abstract update(id: string, data: Partial<RouletteEntity>): Promise<RouletteEntity | null>;
    abstract remove(id: string): Promise<RouletteEntity | null>;
}