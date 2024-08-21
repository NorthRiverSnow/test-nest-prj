/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { SubService } from '../services/sub.service';
import {
  ErrorHandler,
  ParseOptionalDatePipe,
  ParseRequiredPipe,
} from '../services/decorator';
import { Response } from 'express';

@Controller()
export class SubController {
  constructor(private readonly appService: SubService) {}

  @Get('sub/class')
  async getClass(
    @Res() res: Response,
    @Query('name', ParseRequiredPipe) name: string,
    @Query('age', ParseIntPipe) _age: number,
    @Query('birth-day', ParseOptionalDatePipe) _birthDay: Date,
  ) {
    await this.appService.getTestUsingErrorClass(res, name);
  }

  @Get('sub/function')
  getFunction(
    @Res() res: Response,
    @Query('name', ParseRequiredPipe) name: string,
    @Query('age', ParseIntPipe) _age: number,
    @Query('birth-day', ParseOptionalDatePipe) _birthDay: Date,
  ) {
    this.appService.getTestUsingErrorFunction(res, name);
  }
}
