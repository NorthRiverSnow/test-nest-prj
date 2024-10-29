/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, ParseIntPipe, Query, Res } from '@nestjs/common';
import { GetEmployeeInfoService } from '../services/employeeInfo/getEmployeeInfo.Service';

import { Response } from 'express';
import { GetEmployeeInfoType } from '../../entities/decoder/employeeInfo.dto';

@Controller('emoloyee-info')
export class EmployeeInfoController {
  constructor(private readonly appService: GetEmployeeInfoService) {}

  @Get('/')
  async getClass(@Res() res: Response, @Query() query: GetEmployeeInfoType) {
    await this.appService.getEmproyeeInfoService(res, query);
  }
}
