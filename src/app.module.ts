import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RouletteModule } from './roulette/infraestructure/roulette.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'rouletteServiceDb',
    }),
    RouletteModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
