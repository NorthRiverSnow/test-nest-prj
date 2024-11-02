/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, ParseArrayPipe, Post, Query, Res } from '@nestjs/common';
import { EmployeeInfoService } from '../services/employeeInfo/employeeInfo.service';

import { Response } from 'express';
import { GetEmployeeInfoType, CreateEmployeeInfoType } from '../../entities/decoder/employeeInfo.dto';

@Controller('employee-info')
export class EmployeeInfoController {
  constructor(private readonly appService: EmployeeInfoService) {}

  @Get('/')
  async getEmployeeInfo(@Res() res: Response, @Query() query: GetEmployeeInfoType) {
    await this.appService.getEmproyeeInfoService(res, query);
  }

  @Post('/')
  async createEmployeeInfo(
    @Res() res: Response,
    @Body(new ParseArrayPipe({ items: CreateEmployeeInfoType })) employeeData: CreateEmployeeInfoType[],
  ) {
    await this.appService.createEmproyeeInfoService(res, employeeData);
  }
}
