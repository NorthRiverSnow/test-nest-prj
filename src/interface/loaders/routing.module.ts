import { Module } from '@nestjs/common';
import { routerModule } from './routerModule';
import { AppModule } from './app.module';

@Module({
  imports: [routerModule, AppModule],
  controllers: [],
})
export class RoutingModule {}
