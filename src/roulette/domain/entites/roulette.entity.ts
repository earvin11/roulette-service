export interface RouletteEntity {
    roulette: string;
    rouletteName: string;
    providerId: string;
    roundDuration: number;
    timeToReleaseJack: number;
    isManualRoulette?: boolean;
    doubleZero?: boolean;
    active?: boolean;
    jackpot?: boolean;
    uuid?: string;
}