import { RoundEntity } from '../entities/round.entity';

export abstract class RoundCacheRepository {
    abstract save(data: RoundEntity): Promise<string>;
    abstract findByUuid(roundUuid: string): Promise<string | null>;
    abstract delete(roundUuid: string): Promise<void>;
};