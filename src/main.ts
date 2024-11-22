import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { env } from "./infrastracture/env"
import { RoutingModule } from "./interface/loaders/routing.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(RoutingModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api-docs", app, document)
  // v1とv2でopen api 分けたい時に使う
  // v1Docs(app);
  // v2Docs(app);

  await app.listen(3000)
  console.log(`
      ################################################
      🛡️  Server listening on port: ${env.API_PORT} 🛡️
      ################################################
      Database Host: ${env.DB_HOST}
      Database Pass: LOL Just kidding.
    `)
}
void bootstrap()
