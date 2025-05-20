import { Injectable } from '@nestjs/common';
import { RoundUseCases } from './round.use-cases';
import { RoundCacheUseCases } from './round-cache.use-cases';

@Injectable()
export class ClosedRoundUseCase {
    constructor(
        private readonly roundUseCases: RoundUseCases,
        private readonly roundCacheUseCases: RoundCacheUseCases,
    ) {}
    async run(roundUuid: string) {
        const round = await this.roundUseCases.findOneBy({ uuid: roundUuid });
        if(!round) return {
            error: true,
            message: 'Error round no encontrado',
            roundUuid,
        };

        await this.roundCacheUseCases.remove(roundUuid);

        return await this.roundUseCases.updateByUuid(roundUuid, {
            open: false
        });
    }
}