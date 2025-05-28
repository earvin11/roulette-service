import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerWinston } from 'src/logging/infraestructure/logger.winston';
import { LoggerPort } from 'src/logging/domain/logger.port';

@Module({
  providers: [
    LoggerWinston,
    {
      provide: LoggerPort,
      useExisting: LoggerWinston,
    },
  ],
  exports: [LoggerPort],
})
export class LogginModule {}