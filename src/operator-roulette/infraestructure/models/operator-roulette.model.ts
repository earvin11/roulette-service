import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OperatorRouletteEntity } from 'src/operator-roulette/domain/entites/operator-roulette.entity';

@Schema()
export class OperatorRoulette extends Document implements OperatorRouletteEntity {
    @Prop()
    operator: string;

    @Prop()
    roulette: string;

    @Prop()
    providerId: string;

    @Prop({ default: false })
    doubleZero: boolean;

    @Prop({ default: false })
    jackpot: boolean;

    @Prop()
    order: number;

    @Prop()
    currencies: string[];

    @Prop({ default: 36 })
    pleno: number;

    @Prop({ default: 18 })
    semipleno: number;

    @Prop({ default: 9 })
    cuadro: number;

    @Prop({ default: 12 })
    calle: number;

    @Prop({ default: 6 })
    linea: number;

    @Prop({ default: 3 })
    columna: number;

    @Prop({ default: 2 })
    docena: number;

    @Prop({ default: 2 })
    chanceSimple: number;

    @Prop({ default: 12 })
    cubre: number;

    @Prop({ default: 7 })
    specialCalle: number;

    @Prop({ unique: true })
    uuid: string;

    @Prop()
    layout?: boolean;

    @Prop()
    template?: string;

    @Prop()
    logo?: string;
}

export const OperatorRouletteSchema = SchemaFactory.createForClass(OperatorRoulette);