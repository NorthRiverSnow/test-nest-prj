import { Module } from '@nestjs/common';
import { SubService } from '../services/sub.service';
import { SubController } from '../router/sub.controller';
import { ErrorHandler, TypeOrmTransaction } from '../services/decorator';

@Module({
  imports: [],
  controllers: [SubController],
  providers: [SubService, TypeOrmTransaction, ErrorHandler],
})
export class SubModule {}
