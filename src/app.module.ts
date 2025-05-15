import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoundModule } from './rounds/infraestructure/round.module';
import { RouletteModule } from './roulette/infraestructure/roulette.module';
import { DateServiceModule } from './date-service/infraestructure/date-service.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WsServerModule } from './ws-server/infraestructure/ws-server.module';
import { OperatorModule } from './operators/infraestructure/operator.module';
import { envs } from './config/envs';
// import { QueueName } from './shared/enums/queues-names.enum';

@Module({
  imports: [
    MongooseModule.forRoot(envs.dbUri, {
      dbName: envs.dbName,
    }),
    // BullModule.forRoot({
    //   connection: {
    //     host: envs.redisUri,
    //     port: envs.redisPort,
    //   },
    // }),
    // BullModule.registerQueue(
    //   { name: QueueName.ROUND_START },
    //   { name: QueueName.ROUND_UPDATE },
    //   { name: QueueName.ROUND_END }
    // ),
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
