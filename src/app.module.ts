import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RoundModule } from './rounds/infraestructure/round.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      // dbName: 'rouletteServiceDb',
      dbName: 'dbRuletas',
    }),
     BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    RoundModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
