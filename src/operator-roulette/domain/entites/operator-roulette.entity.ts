export interface OperatorRouletteEntity {
    operator: string;
    roulette: string;
    rouletteName: string;
    providerId: string;
    roundDuration: number;
    timeToReleaseJack: number;
    isManualRoulette?: boolean;
    doubleZero?: boolean;
    jackpot?: boolean;
    order: number;
    active?: boolean;
    currencies: string[];
    pleno?: number;
    semipleno?: number;
    cuadro?: number;
    calle?: number;
    linea?: number;
    columna?: number;
    docena?: number;
    chanceSimple?: number;
    cubre?: number;
    specialCalle?: number;
    uuid?: string;
    layout?: boolean;
    template?: string;
    logo?: string;
}