import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RouletteFisicEntity } from 'src/roulette/domain/entites/roulette-fisic.entity';
import { RouletteFisic } from 'src/roulette/domain/implementations/roulette-fisic.value';

export class RouletteFisicModel extends Document {
    @Prop()
    name: string;
    @Prop()
    providerId: string;
    @Prop()
    crupier: string;
    @Prop()
    jackpot?: boolean | undefined;
    @Prop()
    urlTransmision: string;
    @Prop()
    roundDuration: number;
    @Prop()
    minutesToDisable?: number | undefined;
    @Prop()
    doubleZero?: boolean | undefined;
    @Prop()
    timeOne: number;
    @Prop()
    timeTwo: number;
    @Prop()
    timeThree: number;
    @Prop()
    timeFour: number;
    @Prop()
    aditionalTime: number;
    @Prop()
    timeToReleaseJack: number;
    @Prop()
    timeToStartAnimation: number;
    @Prop()
    animation: number;

}

export const RouletteFisicSchema = SchemaFactory.createForClass(RouletteFisicModel);