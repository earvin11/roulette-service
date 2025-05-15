import { DateServiceUseCases } from 'src/date-service/application/date-service.use-cases';
import { RoundEntity } from '../domain/entities/round.entity';
import { Round } from '../domain/implementations/round.value';
import { RoundRepository } from '../domain/repositories/round.repository';
import { Injectable } from '@nestjs/common';

interface ICreateRound {
    rouletteId: string;
    rouletteName: string;
    providerId: string;
    identifierNumber: number;
    secondsToAdd: number;
}

@Injectable()
export class RoundUseCases {
    constructor(
        private readonly roundRepository: RoundRepository,
        private readonly dateServiceUseCases: DateServiceUseCases,
    ) {}

    public create = async(data: ICreateRound) => {
        const {
            rouletteId,
            rouletteName,
            providerId,
            identifierNumber,
            secondsToAdd,
        } = data;

        const date = this.dateServiceUseCases.getCurrentDate('DD-MM-YYYY');
        const time = this.dateServiceUseCases.getCurrentTime('HH-mm-ss');

        const number = await this.verifyDate(rouletteId);

        const startDate = new Date();
        const futureDate = new Date(startDate.getTime() + secondsToAdd * 1000);
        const newRound = new Round({
            code: `${rouletteName}-${date}-${time}-${number}`,
            end_date: futureDate,
            identifierNumber,
            number,
            open: true,
            providerId,
            roulette: rouletteId,
            result: -1,
            start_date: startDate 
        });
        return await this.roundRepository.create(newRound);
    };

    public findAll = async(page = 1, limit = 10) => {
        return await this.roundRepository.findAll(page, limit)
    };

    public findByUuid = async(uuid: string) => {
        return await this.roundRepository.findByUuid(uuid);
    };

    public findOneBy = async(filter: Record<string, any>) => {
        return await this.roundRepository.findOneBy(filter);
    };

    public updateByUuid = async(uuid: string, data: Partial<RoundEntity>) => {
        return await this.roundRepository.updateByUuid(uuid, data);
    };

    private verifyDate = async (rouletteId: string) => {
        const rounds: any[] = await this.roundRepository.findManyBy({ roulette: rouletteId });

        if (rounds.length) {
            if (rounds.length > 1) {
                const lastRound = String(rounds[rounds.length - 1].createdAt);
                const beforeLastRound = String(rounds[rounds.length - 2].createdAt);
                const lastRoundDay = lastRound.split(" ")[2];
                const beforeLastRoundDay = beforeLastRound.split(" ")[2];

                if (lastRoundDay !== beforeLastRoundDay) return 1;
            }

            return rounds[rounds.length - 1].number
            ? rounds[rounds.length - 1].number + 1
            : 1;
        }

        return 1;
    };
}