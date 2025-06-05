//import { FLAGRISK } from "../enums/FLAGRISK";

//============================================ Coleccion de data numerica en la class roulette
export interface INumberData {
    number: number;
    weight: number;    
    normalizedWeight: number;  
    isStraightBet: boolean;
    strainghtBetCounter: number;
    //probability: number; 
    betCount: number;
    //flagRisk: FLAGRISK
}