import { RouletteUseCases } from "src/operator-roulette/application/roulette.use-cases";
import { RoundUseCases } from "./round.use-cases";
import { EventPublisher } from "src/events/application/event-publisher";
import { EventsEnum } from "src/shared/enums/events.enum";

export interface IEndRound {
    ID_Ruleta: string;
    ID_Ronda: string;
    Resultado: string;
    Giro: string;
    Rpm: string;
    Error: string;
    Fecha: string;
}

export class EndRoundUseCases {
    constructor(
        private readonly roundUseCases: RoundUseCases,
        private readonly rouletteUseCases: RouletteUseCases,
        private readonly eventPublisher: EventPublisher,
    ) {}
    async run(data: IEndRound) {
        const round = await this.roundUseCases.findOneBy({ providerId: data.ID_Ronda });

        if(!round) return {
            error: true,
            message: 'Error round no encontrado',
            ID_Ronda: data.ID_Ronda,
        }

        const roulette = await this.rouletteUseCases.findOneBy({ providerId: data.ID_Ruleta });
        if(!roulette) return {
            error: true,
            message: 'Error roulette not found',
            providerId: data.ID_Ruleta
        };

        const result = +data.Resultado

        if(result >= 0 && result <= 37) {
            await this.roundUseCases.updateByUuid(round.uuid!, {
                result: result,
                providerId: '999'
            });
        };

        this.eventPublisher.emit(EventsEnum.ROUND_END, {
            msg: 'Round closed',
            result,
            round: round.uuid
        });

        return;
    }
}