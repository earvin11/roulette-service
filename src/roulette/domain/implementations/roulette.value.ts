import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { RouletteEntity } from '../entites/roulette.entity';

export class Roulette implements RouletteEntity {
    public name: string;
    public providerId: string;
    public roundDuration: number;
    public timeToReleaseJack: number;
    public jackpot?: boolean;
    public doubleZero?: boolean;
    public uuid: string;
    public isManualRoulette?: boolean;
    public active?: boolean;

    constructor(data: RouletteEntity) {
        this.name = data.name;
        this.providerId = data.providerId;
        this.doubleZero = data.doubleZero;
        this.jackpot = data.jackpot;
        this.uuid = generateUuid();
        this.timeToReleaseJack = data.timeToReleaseJack;
        this.roundDuration = data.roundDuration;
        this.isManualRoulette = data.isManualRoulette;
        this.active = true;
    }
    
}