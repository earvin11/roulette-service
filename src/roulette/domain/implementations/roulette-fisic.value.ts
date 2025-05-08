import { generateUuid } from 'src/shared/helpers/generate-uuid.helper';
import { RouletteFisicEntity } from '../entites/roulette-fisic.entity';

export class RouletteFisic implements RouletteFisicEntity {

    name: string;
    providerId: string;
    crupier: string;
    jackpot?: boolean;
    urlTransmision: string;
    roundDuration: number;
    minutesToDisable?: number;
    doubleZero?: boolean;
    timeOne: number;
    timeTwo: number;
    timeThree: number;
    timeFour: number;
    aditionalTime: number;
    timeToReleaseJack: number;
    timeToStartAnimation: number;
    animation: number;
    uuid: string;

    constructor(data: RouletteFisicEntity) {
        this.name = data.name;
        this.providerId = data.providerId;
        this.crupier = data.crupier;
        this.jackpot = data.jackpot;
        this.doubleZero = data.doubleZero;
        this.urlTransmision = data.urlTransmision;
        this.minutesToDisable = data.minutesToDisable;
        this.roundDuration = data.roundDuration;
        this.timeOne = data.timeOne;
        this.timeTwo = data.timeTwo;
        this.timeThree = data.timeThree;
        this.timeFour = data.timeFour;
        this.aditionalTime = data.aditionalTime;
        this.timeToReleaseJack = data.timeToReleaseJack;
        this.timeToStartAnimation = data.timeToStartAnimation;
        this.animation = data.animation;
        this.uuid = generateUuid();
    }
}