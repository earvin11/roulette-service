import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RoundEntity } from 'src/rounds/domain/entities/round.entity';
import { RoundCacheRepository } from 'src/rounds/domain/repositories/round-cache.repository';

export class RoundCacheRepo implements RoundCacheRepository {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async save(data: RoundEntity): Promise<string> {
        const resp = await this.cacheManager.set(`round:${ data.uuid }`, JSON.stringify(data));
        return resp;
    }
    async findByUuid(roundUuid: string): Promise<string | null> {
        return await this.cacheManager.get(`round:${ roundUuid }`);
    }
    async delete(roundUuid: string): Promise<void> {
        await this.cacheManager.del(`round:${ roundUuid }`);
        return;
    }
}