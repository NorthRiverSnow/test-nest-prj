import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { env } from './infrastracture/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RoutingModule } from './interface/loaders/routing.module';

async function bootstrap() {
  const app = await NestFactory.create(RoutingModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, forbidUnknownValues: true }),
  );
  const configV1 = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentV1 = SwaggerModule.createDocument(app, configV1);
  SwaggerModule.setup('api-docs/v1', app, documentV1);

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
