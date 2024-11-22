import { Module } from "@nestjs/common"
import { ErrorHandler } from "../../services/decorator"
import { EmployeeInfoServiceV2 } from "../../services/v2/employeeInfo/employeeInfoV2.service"
import { EmployeeInfoControllerV2 } from "../../router/v2/employeeInfoV2.controller"

@Module({
  imports: [],
  controllers: [EmployeeInfoControllerV2],
  providers: [EmployeeInfoServiceV2, ErrorHandler],
})
export class EmployeeInfoModuleV2 {}
