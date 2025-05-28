import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';
// Modules
import { RoundModule } from './rounds/infraestructure/round.module';
import { RouletteModule } from './roulette/infraestructure/roulette.module';
import { DateServiceModule } from './date-service/infraestructure/date-service.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WsServerModule } from './ws-server/infraestructure/ws-server.module';
import { OperatorModule } from './operators/infraestructure/operator.module';
import { BetModule } from './bets/infraestructure/bet.module';
import { TransactionModule } from './transactions/infraestructure/transaction.module';
import { LogginModule } from './logging/infraestructure/logger.module';
// import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forRoot(envs.dbUri, {
      dbName: envs.dbName,
    }),
    BullModule.forRoot({
      connection: {
        host: envs.redisUri,
        port: envs.redisPort,
      },
    }),
    // CacheModule.register(),
    EventEmitterModule.forRoot(),
    DateServiceModule,
    LogginModule,
    RouletteModule,
    OperatorModule,
    RoundModule,
    BetModule,
    TransactionModule,
    WsServerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
