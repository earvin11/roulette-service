export interface BetEntity {
    roundUuid: string;
    playerUuid: string;
    gameUuid: string;
    operatorUuid: string;
    type: string;
    value: string | number;
    amount: number;
    isWinner?: boolean;
    amountPayout?: number;
    uuid?: string;
};