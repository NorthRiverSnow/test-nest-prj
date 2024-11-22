import { Controller, Get, Query, Res } from "@nestjs/common"

import { Response } from "express"
import { GetEmployeeInfoType } from "../../../entities/decoder/employeeInfo.dto"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { GetEmployeeInfoResponseDataTypeV2 } from "../../../entities/models/employeeInfo"
import { ApiCommonGetHeaderAndResponses } from "../utils/decorators"
import { EmployeeInfoServiceV2 } from "../../services/v2/employeeInfo/employeeInfoV2.service"

@ApiTags("employee-info")
@Controller()
export class EmployeeInfoControllerV2 {
  constructor(private readonly appService: EmployeeInfoServiceV2) {}

  @ApiOperation({
    summary: "社員情報を取得するAPI",
    description: "typeormを利用して、社員情報を取得するAPI",
  })
  @ApiCommonGetHeaderAndResponses({
    status: 200,
    type: GetEmployeeInfoResponseDataTypeV2,
    isArray: true,
  })
  @Get("/typeorm")
  async getEmployeeInfoTypeOrm(@Res() res: Response, @Query() query: GetEmployeeInfoType) {
    await this.appService.getEmployeeInfoServiceTypeOrm(res, query)
  }

  @ApiOperation({
    summary: "社員情報を取得するAPI",
    description: "sequelizeを利用して、社員情報を取得するAPI",
  })
  @ApiCommonGetHeaderAndResponses({
    status: 200,
    type: GetEmployeeInfoResponseDataTypeV2,
    isArray: true,
  })
  @Get("/sequelize")
  async getEmployeeInfoSequelize(@Res() res: Response, @Query() query: GetEmployeeInfoType) {
    await this.appService.getEmployeeInfoServiceSequelize(res, query)
  }
}
