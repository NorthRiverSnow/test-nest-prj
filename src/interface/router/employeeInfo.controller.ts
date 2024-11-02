/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, ParseArrayPipe, Post, Query, Res } from '@nestjs/common';
import { EmployeeInfoService } from '../services/employeeInfo/employeeInfo.service';

import { Response } from 'express';
import { GetEmployeeInfoType, CreateEmployeeInfoType } from '../../entities/decoder/employeeInfo.dto';

@Controller('employee-info')
export class EmployeeInfoController {
  constructor(private readonly appService: EmployeeInfoService) {}

  @Get('/typeorm')
  async getEmployeeInfoTypeOrm(@Res() res: Response, @Query() query: GetEmployeeInfoType) {
    await this.appService.getEmployeeInfoServiceTypeOrm(res, query);
  }

  @Post('/typeorm')
  async createEmployeeInfoTypeOrm(
    @Res() res: Response,
    @Body(new ParseArrayPipe({ items: CreateEmployeeInfoType })) employeeData: CreateEmployeeInfoType[],
  ) {
    await this.appService.createEmployeeInfoServiceTypeOrm(res, employeeData);
  }

  @Get('/sequelize')
  async getEmployeeInfoSequelize(@Res() res: Response, @Query() query: GetEmployeeInfoType) {
    await this.appService.getEmployeeInfoServiceSequelize(res, query);
  }

  @Post('/sequelize')
  async createEmployeeInfoSequelize(
    @Res() res: Response,
    @Body(new ParseArrayPipe({ items: CreateEmployeeInfoType })) employeeData: CreateEmployeeInfoType[],
  ) {
    await this.appService.createEmployeeInfoServiceSequelize(res, employeeData);
  }
}
