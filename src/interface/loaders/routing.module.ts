import { Module } from '@nestjs/common';
import { routerModule } from './routerModule';
import { AppModule } from './v1/app.module';
import { AppModuleV2 } from './v2/appV2.module';

@Module({
  imports: [routerModule, AppModule, AppModuleV2],
  controllers: [],
})
export class RoutingModule {}
