export interface BetEntity {
    roundUuid: string;
    playerUuid: string;
    gameUuid: string;
    operatorUuid: string;
    type: string;
    value: string | number;
    amount: number;
    betReference: string; // Mismas apuestas del jugador en la ronda referenciadas con un uuid para enviarlo a wallet
    isWinner?: boolean;
    amountPayout?: number;
    uuid?: string;
};