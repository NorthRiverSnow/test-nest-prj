import { Module } from "@nestjs/common"
import { AppController } from "../../router/v1/app.controller"
import { EmployeeInfoModuleV2 } from "./employeeInfoV2.module"

@Module({
  imports: [EmployeeInfoModuleV2],
  controllers: [AppController],
})
export class AppModuleV2 {}
