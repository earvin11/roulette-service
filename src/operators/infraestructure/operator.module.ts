import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperatorConfig, OperatorConfigSchema } from './models/operator-config.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OperatorConfig.name,
        schema: OperatorConfigSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    // RouletteMongoRepository,
    // {
    //   provide: RouletteRepository,
    //   useExisting: RouletteMongoRepository,
    // },
  ],
  exports: [],
})
export class OperatorModule {}