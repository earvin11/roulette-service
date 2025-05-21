import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperatorConfig, OperatorConfigSchema } from './models/operator-config.model';
import { OperatorConfigMongoRepository } from './repositories/operator-config.mongo-repository';
import { OperatorConfigRepository } from '../domain/repositories/operator-config.repository';
import { OperatorConfigController } from './controllers/operator-config.controller';
import { OperatorConfigUseCases } from '../application/operator-config.use-cases';

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
    OperatorConfigUseCases,
    {
      provide: OperatorConfigRepository,
      useExisting: OperatorConfigMongoRepository,
    },
  ],
  exports: [OperatorConfigUseCases],
})
export class OperatorModule {}