import { Module } from '@nestjs/common';
import { GetEmployeeInfoService } from '../services/employeeInfo/getEmployeeInfo.Service';
import { EmployeeInfoController } from '../router/employeeInfo.controller';
import { ErrorHandler } from '../services/decorator';

@Module({
  imports: [],
  controllers: [EmployeeInfoController],
  providers: [GetEmployeeInfoService, ErrorHandler],
})
export class EmployeeInfoModule {}
