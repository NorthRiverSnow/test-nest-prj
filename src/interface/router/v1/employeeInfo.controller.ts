import { Body, Controller, Get, ParseArrayPipe, Post, Query, Res } from "@nestjs/common"
import { EmployeeInfoService } from "../../services/v1/employeeInfo/employeeInfo.service"

import { Response } from "express"
import { GetEmployeeInfoType, CreateEmployeeInfoType } from "../../../entities/decoder/employeeInfo.dto"
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger"
import { GetEmployeeInfoResponseDataType } from "../../../entities/models/employeeInfo"
import { ApiCommonCreateHeaderAndResponses, ApiCommonGetHeaderAndResponses } from "../utils/decorators"

@ApiTags("employee-info")
@Controller()
export class EmployeeInfoController {
  constructor(private readonly appService: EmployeeInfoService) {}

  @ApiOperation({
    summary: "社員情報を取得するAPI",
    description: "typeormを利用して、社員情報を取得するAPI",
  })
  @ApiCommonGetHeaderAndResponses({
    status: 200,
    type: GetEmployeeInfoResponseDataType,
    isArray: true,
  })
  @Get("/typeorm")
  async getEmployeeInfoTypeOrm(@Res() res: Response, @Query() query: GetEmployeeInfoType) {
    await this.appService.getEmployeeInfoServiceTypeOrm(res, query)
  }

  @ApiOperation({
    summary: "社員情報を登録するAPI",
    description: "typeormを利用して、社員情報を登録するAPI",
  })
  @ApiBody({ type: CreateEmployeeInfoType, isArray: true })
  @ApiCommonCreateHeaderAndResponses()
  @Post("/typeorm")
  async createEmployeeInfoTypeOrm(
    @Res() res: Response,
    @Body(new ParseArrayPipe({ items: CreateEmployeeInfoType }))
    employeeData: CreateEmployeeInfoType[],
  ) {
    await this.appService.createEmployeeInfoServiceTypeOrm(res, employeeData)
  }

  @ApiOperation({
    summary: "社員情報を取得するAPI",
    description: "sequelizeを利用して、社員情報を取得するAPI",
  })
  @ApiCommonGetHeaderAndResponses({
    status: 200,
    type: GetEmployeeInfoResponseDataType,
    isArray: true,
  })
  @Get("/sequelize")
  async getEmployeeInfoSequelize(@Res() res: Response, @Query() query: GetEmployeeInfoType) {
    await this.appService.getEmployeeInfoServiceSequelize(res, query)
  }

  @ApiOperation({
    summary: "社員情報を登録するAPI",
    description: "sequelizeを利用して、社員情報を登録するAPI",
  })
  @ApiBody({ type: CreateEmployeeInfoType, isArray: true })
  @ApiCommonCreateHeaderAndResponses()
  @Post("/sequelize")
  async createEmployeeInfoSequelize(
    @Res() res: Response,
    @Body(new ParseArrayPipe({ items: CreateEmployeeInfoType }))
    employeeData: CreateEmployeeInfoType[],
  ) {
    await this.appService.createEmployeeInfoServiceSequelize(res, employeeData)
  }
}
