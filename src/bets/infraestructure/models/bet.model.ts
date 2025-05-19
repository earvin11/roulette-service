import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BetEntity } from 'src/bets/domain/etities/bet.entity';

@Schema()
export class BetModel extends Document implements BetEntity {
    
    @Prop()
    roundUuid: string;

    @Prop()
    playerUuid: string;

    @Prop()
    gameUuid: string;

    @Prop()
    type: string;

    @Prop()
    value: string;

    @Prop({ type: Object })
    bet: Record<string, any>;

    @Prop()
    amount: number;

    @Prop({ default: false })
    isWinner: boolean;

    @Prop({ default: 0 })
    amountPayout: number;

    @Prop({ index: true, unique: true })
    uuid: string;

    @Prop({ default: Date.now, expires: 30 }) // Expira en 1 hora (3600 segundos)
    createdAt: Date;
}

export const BetSchema = SchemaFactory.createForClass(BetModel);