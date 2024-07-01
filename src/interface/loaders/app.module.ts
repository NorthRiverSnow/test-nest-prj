import { Module } from '@nestjs/common';
import { AppController } from '../router/app.controller';
import { AppService } from '../services/app.service';
import { SubModule } from './sub.module';
import { typeOrm } from 'src/infrastracture/orm';

@Module({
  imports: [typeOrm, SubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
