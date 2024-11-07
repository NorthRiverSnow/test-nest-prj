import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../loaders/v1/app.module';
import { AppModuleV2 } from '../loaders/v2/appV2.module';
import { EmployeeInfoModule } from '../loaders/v1/employeeInfo.module';
import { EmployeeInfoModuleV2 } from '../loaders/v2/employeeInfoV2.module';

export const v1Docs = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('v1: API Documentation')
    .setDescription('v1: API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule, EmployeeInfoModule],
  });
  SwaggerModule.setup('api-docs/v1', app, document);
};

export const v2Docs = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('v2: API Documentation')
    .setDescription('v2: API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModuleV2, EmployeeInfoModuleV2],
  });
  SwaggerModule.setup('api-docs/v2', app, document);
};
