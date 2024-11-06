import { Module } from '@nestjs/common';
import { EmployeeInfoService } from '../services/employeeInfo/employeeInfo.service';
import { EmployeeInfoController } from '../router/employeeInfo.controller';
import { ErrorHandler } from '../services/decorator';

@Module({
  imports: [],
  controllers: [EmployeeInfoController],
  providers: [EmployeeInfoService, ErrorHandler],
})
export class EmployeeInfoModule {}
