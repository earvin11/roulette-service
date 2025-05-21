 import { Injectable } from '@nestjs/common';
import { BetRepository } from '../domain/repositories/bet.repository';
import { RoundCacheUseCases } from 'src/rounds/application';
import { BetEntity } from '../domain/entities/bet.entity';
import { OperatorConfigUseCases } from 'src/operators/application/operator-config.use-cases';

@Injectable()
export class PayBetsUseCase {
    constructor(
        private readonly betRepository: BetRepository,
        private readonly operatorConfigUseCases: OperatorConfigUseCases,
        // private readonly roundCacheUseCases: RoundCacheUseCases
    ) {};

    async run(roundUuid: string, result: number) {
        try {
        //    const bets = await this.betRepository.findManyBy({ value: result, roundUuid, amountPayout: 0 });
            const filterWinner = this.createOptionsWinner(result);
            // TODO:
            console.log({ filterWinner })
            // await this.betRepository.updateMany({ value: { $in: filterWinner }, roundUuid, amountPayout: 0 }, { isWinner: true });
            const betsWinner = await this.betRepository.findManyBy({ value: { $in: filterWinner }, roundUuid, amountPayout: 0 });
            // TODO:
            console.log({ betsWinner });

            // const betToUpdate: Promise<BetEntity>[] = []

            for (let i = 0; i < betsWinner.length; i++) {
                const currentBet = betsWinner[i];
                const operatorConfig = await this.operatorConfigUseCases.findByOperator(currentBet.operatorUuid);
                if(!operatorConfig) continue;
                const amountPayout = parseFloat((+operatorConfig[currentBet.type] * +currentBet.amount).toFixed(2));
                //TODO:
                console.log({ amountPayout, operatorPay: operatorConfig[currentBet.type], type: currentBet.type });

                const data = await this.betRepository.updateByUuid(currentBet.uuid!, { amountPayout, isWinner: true });
                // TODO:
                console.log({ data });

            }
            // const betsWinner = await this.betRepository.findManyBy({ roundUuid, isWinner: true });
            // await this.roundCacheUseCases.remove(roundUuid);

            const resp = await this.betRepository.findBetsWinnerWithEarningsGroupPlayer(roundUuid);
            // TODO:
            console.log({ resp });
            return
        } catch (error) {
            // TODO:
            console.log({ error });
            return;
        }
    };

    private createOptionsWinner(result: number): string[] {
        // Definimos las constantes como Sets para mejor performance en búsquedas
        const firstColumnNumbers = new Set([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]);
        const seccondColumnNumbers = new Set([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]);
        const thirdColumnNumbers = new Set([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]);
        const redNumbers = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

        const filterWinner: string[] = [];

        // Verificamos columnas
        if (firstColumnNumbers.has(result)) filterWinner.push('FIRST-COLUMN');
        if (seccondColumnNumbers.has(result)) filterWinner.push('SECOND-COLUMN');
        if (thirdColumnNumbers.has(result)) filterWinner.push('THIRD-COLUMN');

        // Verificamos color
        filterWinner.push(redNumbers.has(result) ? 'RED' : 'BLACK');

        // Verificamos rangos
        if (result > 0 && result < 19) filterWinner.push('1-18');
        if (result >= 19 && result <= 36) filterWinner.push('19-36');

        // Verificamos docenas
        if (result >= 1 && result <= 12) filterWinner.push('FIRST-DOZEN');
        if (result >= 13 && result <= 24) filterWinner.push('SECCOND-DOZEN');
        if (result >= 25 && result <= 36) filterWinner.push('THIRD-DOZEN');

        // Verificamos paridad (solo si es número válido)
        if (result > 0 && result <= 36) {
            filterWinner.push(result % 2 === 0 ? 'EVEN' : 'ODD');
        }

        // Añadimos el número resultante
        filterWinner.push(String(result));

        return filterWinner;
    };
};