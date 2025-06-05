import { IBetMultipliers } from './IBetMultipliers';

export interface IRouletteConfig
{
    betMultipliers: IBetMultipliers;
    jackpotsCollection: number[];
    riskThreshold: number;
    enableStrongBlock: boolean;
    strongBlock: number;
    //virtualBank: number;
}