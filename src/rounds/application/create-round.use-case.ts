import { Injectable } from '@nestjs/common';
import { OperatorRouletteUseCases } from 'src/operator-roulette/application/operator-roulette.use-cases';
import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';

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
        private readonly operatorRouletteUseCases: OperatorRouletteUseCases,
    ) {}
    async run(data: ICreateRound) {
        const { ID_Ruleta } = data;

        const roulette = await this.operatorRouletteUseCases.findOneBy({ providerId: ID_Ruleta });
        //TODO: mejorar error de no coincidir con la ruleta
        if(!roulette) return;

        
    }

    private useIndentifierNumber = async () => {
        const uuid = generateUuid();
        const numericUuid = uuid
            .replace(/-/g, "")
            .replace(/[a-f]/gi, (char) => {
                return (char.charCodeAt(0) - 87).toString(); // 'a' -> 10, 'b' -> 11, ..., 'f' -> 15
            });
        const limitedUuid = numericUuid.slice(0, 10);
        return parseInt(limitedUuid, 10);
    };
}