import { Module } from "@nestjs/common"
import { AppController } from "../../router/v1/app.controller"
import { EmployeeInfoModule } from "./employeeInfo.module"

@Module({
  imports: [EmployeeInfoModule],
  controllers: [AppController],
})
export class AppModule {}
