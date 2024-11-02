import { NestFactory } from '@nestjs/core';
import { AppModule } from './interface/loaders/app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './infrastracture/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, forbidUnknownValues: true }),
  );
  await app.listen(3000);
  console.log(`
      ################################################
      🛡️  Server listening on port: ${env.API_PORT} 🛡️
      ################################################
      Database Host: ${env.DB_HOST}
      Database Pass: LOL Just kidding.
    `);
}
bootstrap();
