import { Injectable } from '@nestjs/common';
import { BetEntity } from '../domain/etities/bet.entity';
import { Bet } from '../domain/implementations/bet.value';
import { BetRepository } from '../domain/repositories/bet.repository';
import { BetInputInterface } from 'src/shared/interfaces/bet-input.interface';

@Injectable()
export class BetUseCases {
    constructor(
        private readonly betRepository: BetRepository
    ) {}

    public create = async(data: BetEntity) => {
        const newData = new Bet(data);
        return await this.betRepository.create(newData);
    };

    public createMany = async(data: BetEntity[]) => {
        const newData = data.map((bet) => {
            return new Bet(bet);
        });

        return await this.betRepository.createMany(newData);
    };

    public processBet = async(data: BetInputInterface) => {
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
            { items: chanceSimple, type: 'chance_simple', key: 'type' },
            { items: color, type: 'color', key: 'type' },
            { items: columns, type: 'column', key: 'type' },
            { items: cuadroNumbers, type: 'cuadro', key: 'number' },
            { items: cubre, type: 'cubre', key: 'type' },
            { items: dozens, type: 'dozens', key: 'type' },
            { items: even_odd, type: 'even_odd', key: 'type' },
            { items: lineaNumbers, type: 'linea', key: 'number' },
            { items: plenoNumbers, type: 'pleno', key: 'number' },
            { items: semiPlenoNumbers, type: 'semi-pleno', key: 'number' },
            { items: specialCalle, type: 'special_calle', key: 'type' }
        ];

        // Generación dinámica de apuestas
        for (const { items, type, key } of betMappings) {
            if (!Array.isArray(items) || !items.length) continue;

            for (const betItem of items) {
                const { amount } = betItem;
                const value = betItem[key];

                bets.push({
                    amount,
                    value,
                    gameUuid: data.roulette,
                    playerUuid: data.player,
                    roundUuid: data.round,
                    type
                });
            }
        }

        return await this.createMany(bets);
    };

    public findAll = async(page = 1, limit = 10) => {
        return await this.betRepository.findAll(page, limit)
    };
}