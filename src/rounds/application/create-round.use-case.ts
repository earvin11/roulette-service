import { Injectable } from '@nestjs/common';
import { RouletteUseCases } from 'src/operator-roulette/application/roulette.use-cases';
import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { RoundUseCases } from './round.use-cases';
import { EventPublisher } from 'src/events/application/event-publisher';
import { EventsEnum } from 'src/shared/enums/events.enum';

 interface ICreateRound {
    ID_Ruleta: string;
    ID_Ronda: string;
    Resultado: string;
    Giro: string;
    Rpm: string;
    Error: string;
    Fecha: string;
}

@Injectable()
export class CreateRoundUseCase {
    constructor(
        private readonly rouletteUseCases: RouletteUseCases,
        private readonly roundUseCases: RoundUseCases,
        private readonly eventPublisher: EventPublisher
    ) {}
    async run(data: ICreateRound) {
        const { ID_Ruleta } = data;

        const configRoulette = await this.rouletteUseCases.findOneBy({ providerId: ID_Ruleta });
        //TODO: mejorar error de no coincidir con la ruleta
        if(!configRoulette) return;

        const result = Number(data.Resultado);
        const possibleResults = [-1, 99];

        //TODO:
        // Evaluar data erronea en los results
        if (!possibleResults.includes(result)) {
            if (this.verifyResult(result)) {

            }
        }

        if(!configRoulette.active) {
            await this.rouletteUseCases.updateOne(configRoulette.uuid!, {
                active: true
            });
        }

        //TODO:
        if(configRoulette.isManualRoulette) {
            //BUSCAR RONDA ACTUAL
            const roundExists = await this.roundUseCases.findOneBy({
                roulette: configRoulette.roulette,
                result: { $in: possibleResults },
                providerId: { $ne: '999' }, // para no tomar en cuenta rondas cerradas
            });
            if (roundExists)
                return {
                    error: true,
                    msg: 'Round by roulette opened',
                    ID_Ronda: roundExists.providerId,
                };
        }

        const round = await this.roundUseCases.create({
            identifierNumber: this.useIndentifierNumber(),
            providerId: ID_Ruleta,
            rouletteId: configRoulette.roulette,
            rouletteName: configRoulette.rouletteName,
            secondsToAdd: configRoulette.roundDuration
        });

        // Publicar ronda para emitir
        this.eventPublisher.emit(EventsEnum.ROUND_START, {
            msg: 'Round opened',
            round: {
                start_date: round.start_date,
                end_date: round.end_date,
                ID_Ronda: data.ID_Ronda,
                identifierNumber: round.identifierNumber,
                round: round.uuid,
            }
        });

        return;
    }

    private useIndentifierNumber = () => {
        const uuid = generateUuid();
        const numericUuid = uuid
            .replace(/-/g, "")
            .replace(/[a-f]/gi, (char) => {
                return (char.charCodeAt(0) - 87).toString(); // 'a' -> 10, 'b' -> 11, ..., 'f' -> 15
            });
        const limitedUuid = numericUuid.slice(0, 10);
        return parseInt(limitedUuid, 10);
    };

    private verifyResult = (result: number) => {
        if (result !== 99) {
            if (result < 0 || result > 37) {
                return true;
            }
        }

        return false;
    };
}