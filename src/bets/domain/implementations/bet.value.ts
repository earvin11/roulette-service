import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { BetEntity } from '../entities/bet.entity';

export class Bet implements BetEntity {
    public roundUuid: string;
    public playerUuid: string;
    public gameUuid: string;
    public operatorUuid: string;
    public type: string;
    public amount: number;
    public value: string | number;
    public betReference: string;
    public isWinner: boolean;
    public amountPayout: number;
    public uuid: string;

    constructor(data: BetEntity) {
        this.roundUuid = data.roundUuid;
        this.playerUuid = data.playerUuid;
        this.gameUuid = data.gameUuid;
        this.operatorUuid = data.operatorUuid;
        this.type = data.type;
        this.amount = data.amount;
        this.value = data.value;
        this.isWinner = false;
        this.amountPayout = 0;
        this.betReference = data.betReference;
        this.uuid = generateUuid();
    };
;
};