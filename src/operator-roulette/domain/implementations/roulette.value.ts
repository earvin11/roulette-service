import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { RouletteEntity } from '../entites/roulette.entity';

export class Roulette implements RouletteEntity {
    public roulette: string;
    public rouletteName: string;
    public providerId: string;
    public roundDuration: number;
    public timeToReleaseJack: number;
    public jackpot?: boolean;
    public doubleZero?: boolean;
    public uuid: string;
    public isManualRoulette?: boolean;
    public active?: boolean;

    constructor(data: RouletteEntity) {
        this.roulette = data.roulette;
        this.rouletteName = data.rouletteName;
        this.providerId = data.providerId;
        this.doubleZero = data.doubleZero;
        this.jackpot = data.jackpot;
        this.uuid = generateUuid();
        this.timeToReleaseJack = data.timeToReleaseJack;
        this.roundDuration = data.roundDuration;
        this.isManualRoulette = data.isManualRoulette;
        this.active = data.active;
    }
    
}