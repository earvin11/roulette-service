export interface RouletteEntity {
    name: string;
    providerId: string;
    roundDuration: number;
    timeToReleaseJack: number;
    isManualRoulette?: boolean;
    doubleZero?: boolean;
    active?: boolean;
    jackpot?: boolean;
    uuid?: string;
}