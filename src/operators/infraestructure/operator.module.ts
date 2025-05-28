import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { OperatorConfig, OperatorConfigSchema } from './models/operator-config.model';
import { OperatorConfigMongoRepository } from './repositories/operator-config.mongo-repository';
import { OperatorConfigRepository } from '../domain/repositories/operator-config.repository';
import { OperatorConfigController } from './controllers/operator-config.controller';
import { OperatorConfigUseCases } from '../application/operator-config.use-cases';
import { OperatorConfigCacheRepo } from './repositories/operator-config.cache-repo';
import { OperatorConfigCacheUseCases } from '../application/operator-config-cache.use-cases';
import { OperatorConfigCacheRepository } from '../domain/repositories/operator-config.cache-repository';
import { LoggerWinston } from 'src/logging/infraestructure/logger.winston';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { LogginModule } from 'src/logging/infraestructure/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OperatorConfig.name,
        schema: OperatorConfigSchema,
      },
    ]),
    CacheModule.register(),
    LogginModule,
  ],
  controllers: [OperatorConfigController],
  providers: [
    OperatorConfigMongoRepository,
    OperatorConfigCacheRepo,
    OperatorConfigUseCases,
    OperatorConfigCacheUseCases,
    {
      provide: OperatorConfigRepository,
      useExisting: OperatorConfigMongoRepository,
    },
    {
      provide: OperatorConfigCacheRepository,
      useExisting: OperatorConfigCacheRepo
    },
    // {
    //   provide: LoggerPort,
    //   useClass: LoggerWinston,
    // },
  ],
  exports: [OperatorConfigUseCases, OperatorConfigCacheUseCases],
})
export class OperatorModule {}