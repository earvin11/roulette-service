export interface RouletteFisicEntity {
    // _id: string;
    name: string;
    providerId: string;
    crupier: string;
    urlTransmision: string;
    roundDuration: number;
    jackpot?: boolean;
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
    uuid?: string;
}