import { Injectable } from '@nestjs/common';
import { BetEntity } from '../domain/entities/bet.entity';
import { Bet } from '../domain/implementations/bet.value';
import { BetRepository } from '../domain/repositories/bet.repository';
import { BetInputInterface, NumberBet, Bet as BetBody } from 'src/shared/interfaces/bet-input.interface';
import { BetsTypesEnum } from 'src/shared/enums/bets.enum';
import { TransactionUseCases } from 'src/transactions/application/transaction.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { EventPublisher } from 'src/events/application/event-publisher';
import { EventsEnum } from 'src/shared/enums/events.enum';

@Injectable()
export class CreateBetsUseCase {
    constructor(
        private readonly betRepository: BetRepository,
        private readonly transactionUseCases: TransactionUseCases,
        private readonly eventPublisher: EventPublisher,
        private readonly loggerPort: LoggerPort
    ) {};

    public create = async(data: BetEntity) => {
        try {
            const newData = new Bet(data);
            return await this.betRepository.create(newData);
        } catch (error) {
            this.loggerPort.error(`Error metodo CreateBetsUseCase.create`, error.stack);
            throw error;
        };
    };

    public createMany = async(data: BetEntity[]) => {
        try {
            const newData = data.map((bet) => {
                return new Bet(bet);
            });
    
            return await this.betRepository.createMany(newData);
        } catch (error) {
            this.loggerPort.error(`Error metodo CreateBetsUseCase.createMany`, error.stack);
            throw error;
        };
    };

    public processBet = async(data: BetInputInterface) => {
        try {
            const {
                calleNumbers = [],
                chanceSimple = [],
                color = [],
                columns = [],
                cuadroNumbers = [],
                cubre = [],
                dozens = [],
                even_odd = [],
                lineaNumbers = [],
                plenoNumbers = [],
                semiPlenoNumbers = [],
                specialCalle = []
            } = data.bet;
    
            const bets: BetEntity[] = [];
    
            // Mapeo de propiedades y tipos
            const betMappings = [
                { items: calleNumbers, type: 'calle', key: 'number' },
                { items: chanceSimple, type: 'chanceSimple', key: 'type' },
                { items: color, type: 'color', key: 'type' },
                { items: columns, type: 'column', key: 'type' },
                { items: cuadroNumbers, type: 'cuadro', key: 'number' },
                { items: cubre, type: 'cubre', key: 'type' },
                { items: dozens, type: 'dozens', key: 'type' },
                { items: even_odd, type: 'evenOdd', key: 'type' },
                { items: lineaNumbers, type: 'linea', key: 'number' },
                { items: plenoNumbers, type: 'pleno', key: 'number' },
                { items: semiPlenoNumbers, type: 'semiPleno', key: 'number' },
                { items: specialCalle, type: 'specialCalle', key: 'type' }
            ];
    
            // Generación dinámica de apuestas
            for (const { items, type, key } of betMappings) {
                if (!Array.isArray(items) || !items.length) continue;
    
                for (const betItem of items) {
                    const { amount } = betItem;
                    const value = betItem[key];
                    bets.push({
                        amount,
                        value: type === 'dozens' ? `${ value }-DOZEN` 
                        : type === 'column' ? `${ value }-COLUMN` : value,
                        gameUuid: data.roulette,
                        playerUuid: data.player,
                        roundUuid: data.round,
                        operatorUuid: data.operatorId,
                        type
                    });
                }
            }
            
            const totalAmount = this.calculateTotalAmount(data.bet);

            await Promise.all([
                this.createMany(bets),
                this.transactionUseCases.create({
                    roundUuid: data.round,
                    amount: totalAmount,
                    playerUuid: data.player,
                    type: 'DEBIT',
                    details: data.bet
                })
            ]);

            this.eventPublisher.emit(EventsEnum.BET_SUCCESS, { msg: 'Success' });
            return;
        } catch (error) {
            this.eventPublisher.emit(EventsEnum.BET_ERROR, { msg: 'Internal server error' })
            this.loggerPort.error(`Error registrando apuesta metodo CreateBetsUseCase.processBet`, error.stack);
            throw error;
        };
    };

    private calculateTotalAmount(bet: BetBody): number {
        let totalAmountInBet: number = 0;

        Object.keys(bet).forEach((keyBet) => {
            switch (keyBet) {
                case BetsTypesEnum.SEMI_PLENO: {
                    const amount = this.calculateAmountNumbers(
                        bet[BetsTypesEnum.SEMI_PLENO],
                        2
                    );
                    totalAmountInBet += amount;
                    break;
                }
                case BetsTypesEnum.CALLE: {
                    const amount = this.calculateAmountNumbers(
                        bet[BetsTypesEnum.CALLE],
                        3
                    );
                    totalAmountInBet += amount;
                    break;
                }
                case BetsTypesEnum.CUADRO: {
                    const amount = this.calculateAmountNumbers(
                        bet[BetsTypesEnum.CUADRO],
                        4
                    );
                    totalAmountInBet += amount;
                    break;
                }
                case BetsTypesEnum.LINEA: {
                    const amount = this.calculateAmountNumbers(
                        bet[BetsTypesEnum.LINEA],
                        6
                    );
                    totalAmountInBet += amount;
                    break;
                }

                default: {
                    const currentBetArr = bet[keyBet];
                    currentBetArr.forEach(({ amount }) => {
                        totalAmountInBet += amount;
                    });
                }
            }
        });
        return parseFloat(totalAmountInBet.toFixed(2));
    }
    private calculateAmountNumbers = (numbers: NumberBet[], iteratorNumber: number) => {
        let amount = 0;
        for (let i = 0; i <= numbers.length - iteratorNumber; i += iteratorNumber) {
            const currentBet = numbers[i];
            amount += currentBet.amount;
        }
        return amount;
    };
}