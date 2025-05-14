import { RoundEntity } from '../domain/entities/round.entity';
import { Round } from '../domain/implementations/round.value';
import { RoundRepository } from '../domain/repositories/round.repository';


interface ICreateRound {
    rouletteId: string;
    rouletteName: string;
    providerId: string;
    identifierNumber: number;
    secondsToAdd: number;
}

export class RoundUseCases {
    constructor(
        private readonly roundRepository: RoundRepository
    ) {}

    public create = async(data: ICreateRound) => {
        const {
            rouletteId,
            rouletteName,
            providerId,
            identifierNumber,
            secondsToAdd,
        } = data;

        // const date = moment().utc().format('DD-MM-YYYY');
        // const time = moment().utc().format('HH-mm-ss');

        // TODO:
        // const number = await verifyDate(rouletteId);

        const startDate = new Date();
        const futureDate = new Date(startDate.getTime() + secondsToAdd * 1000);
        // const newRound = new Round(data);
        // return await this.roundRepository.create(newRound);
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
}