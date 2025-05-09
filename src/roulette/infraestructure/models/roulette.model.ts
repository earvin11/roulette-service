import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { RouletteEntity } from '../../domain/entites/roulette.entity';

export class RouletteModel extends Document {
    @Prop()
    type: string;
    @Prop()
    doubleZero: boolean;
    @Prop()
    language: string;
    @Prop()
    status: boolean;
    // @Prop()
    // lastJackpot: number;
    // @Prop()
    // jackpotRounds: number;
    // @Prop()
    // currenJackpotRound: number;
    // @Prop()
    // jackpotWin?: any[] | undefined;
    // @Prop()
    // rollback: boolean;
    @Prop()
    active: boolean;
    @Prop()
    manualDisable: boolean;
    @Prop()
    jackpotRandom: boolean;
    @Prop()
    jackpotVersion: string;
    @Prop()
    alertEmails: string[];
    @Prop()
    maxRepeatedResults: number;
    @Prop()
    multisAllowed: number[];
    @Prop()
    isManualRoulette: boolean;
    @Prop()
    numbersDistribution: string;
    @Prop()
    bank: number;
    @Prop()
    isShow: boolean;
    @Prop()
    openingTime: string;
    @Prop()
    closingTime: string;
    @Prop()
    alwaysOpen: boolean;
    @Prop()
    cameraVersion: string;
    @Prop()
    initialBank: number;
    @Prop()
    maximunBank: number;
    @Prop()
    name: string;
    @Prop()
    code: string;
    @Prop()
    logo: string;
    @Prop()
    imgBackground: string;
    @Prop()
    color: string;
    @Prop()
    providerId: string;
    @Prop()
    pleno: number;
    @Prop()
    semipleno: number;
    @Prop()
    cuadro: number;
    @Prop()
    calle: number;
    @Prop()
    linea: number;
    @Prop()
    columna: number;
    @Prop()
    docena: number;
    @Prop()
    chanceSimple: number;
    @Prop()
    cubre: number;
    @Prop()
    specialCalle: number;
    @Prop()
    minBet: number;
    @Prop()
    maxBet: number;
    @Prop()
    maxBetPosition: number;
    @Prop()
    urlTransmision: string;
    @Prop()
    roundDuration: number;
    @Prop()
    minutesToDisable: number;
    @Prop()
    animals: any[];
    @Prop()
    maxPlenosBet: number;
    @Prop()
    numbersOfJackpot: number;
}

export const RouletteSchema = SchemaFactory.createForClass(RouletteModel);