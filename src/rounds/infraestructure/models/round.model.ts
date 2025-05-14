import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoundEntity } from '../../domain/entities/round.entity';

@Schema()
export class RoundModel extends Document implements RoundEntity {
    @Prop()
    code: string;
    @Prop()
    start_date: Date;
    @Prop()
    end_date: Date;
    @Prop()
    result: number;
    @Prop()
    providerId: string;
    @Prop()
    roulette: string;
    @Prop()
    open: boolean;
    @Prop()
    number: number;
    @Prop()
    identifierNumber: number;
    @Prop({ unique: true, index: true })
    uuid: string;
}

export const RoundSchema = SchemaFactory.createForClass(RoundModel);