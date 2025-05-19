import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { BetEntity } from '../etities/bet.entity';

export class Bet implements BetEntity {
    public roundUuid: string;
    public playerUuid: string;
    public gameUuid: string;
    public type: string;
    public amount: number;
    public value: string | number
    public bet: Record<string, any>;
    public isWinner: boolean;
    public amountPayout: number;
    public uuid: string;

    constructor(data: BetEntity) {
        this.roundUuid = data.roundUuid;
        this.playerUuid = data.playerUuid;
        this.gameUuid = data.gameUuid;
        this.type = data.type;
        this.amount = data.amount;
        this.value = data.value;
        this.bet = data.bet;
        this.isWinner = false;
        this.amountPayout = 0;
        this.uuid = generateUuid();
    };
;
};