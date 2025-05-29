import { Injectable } from '@nestjs/common';
import { RoundUseCases } from './round.use-cases';
import { RoundCacheUseCases } from './round-cache.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';

@Injectable()
export class ClosedRoundUseCase {
    constructor(
        private readonly roundUseCases: RoundUseCases,
        private readonly roundCacheUseCases: RoundCacheUseCases,
        private readonly loggerPort: LoggerPort
    ) {}
    async run(roundUuid: string) {
        try {
            const round = await this.roundUseCases.updateByUuid(roundUuid, {
                open: false
            });
            if(!round) return {
                error: true,
                message: 'Error round no encontrado',
                roundUuid,
            };
    
            await this.roundCacheUseCases.remove(roundUuid);
            await this.roundCacheUseCases.save({
                ...round,
                open: false
            });
            return;
        } catch (error) {
            this.loggerPort.error('Error in ClosedRoundUseCase.run', error.stack)
        }
    }
}