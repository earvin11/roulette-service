import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RoundModule } from './rounds/infraestructure/round.module';
import { RouletteModule } from './roulette/infraestructure/roulette.module';
import { DateServiceModule } from './date-service/infraestructure/date-service.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WsServerModule } from './ws-server/infraestructure/ws-server.module';
import { OperatorModule } from './operators/infraestructure/operator.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'rouletteServiceDb',
      // dbName: 'dbRuletas',
    }),
     BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    EventEmitterModule.forRoot(),
    DateServiceModule,
    RouletteModule,
    OperatorModule,
    RoundModule,
    WsServerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
