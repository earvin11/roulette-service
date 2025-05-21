import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperatorConfig, OperatorConfigSchema } from './models/operator-config.model';
import { OperatorConfigMongoRepository } from './repositories/operator-config.mongo-repository';
import { OperatorConfigRepository } from '../domain/repositories/operator-config.repository';
import { OperatorConfigController } from './controllers/operator-config.controller';
import { OperatorConfigUseCases } from '../application/operator-config.use-cases';
import { OperatorConfigCacheRepo } from './repositories/operator-config.cache-repo';
import { OperatorConfigCacheUseCases } from '../application/operator-config-cache.use-cases';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OperatorConfig.name,
        schema: OperatorConfigSchema,
      },
    ]),
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
      provide: OperatorConfigRepository,
      useExisting: OperatorConfigCacheRepo
    }
  ],
  exports: [OperatorConfigUseCases, OperatorConfigCacheUseCases],
})
export class OperatorModule {}