import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const logger = new Logger('Bootstrap')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // app.setGlobalPrefix('api')
  await app.listen(envs.port);
  logger.log(`App running in port ${ envs.port }`)
}
bootstrap();
