import { Module } from "@nestjs/common"
import { EmployeeInfoService } from "../../services/v1/employeeInfo/employeeInfo.service"
import { EmployeeInfoController } from "../../router/v1/employeeInfo.controller"
import { ErrorHandler } from "../../services/decorator"

@Module({
  imports: [],
  controllers: [EmployeeInfoController],
  providers: [EmployeeInfoService, ErrorHandler],
})
export class EmployeeInfoModule {}
