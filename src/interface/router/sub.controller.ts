/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { SubService } from '../services/sub.service';
import {
  ErrorHandler,
  ParseOptionalDatePipe,
  ParseRequiredPipe,
} from '../services/decorator';

@Controller()
export class SubController {
  constructor(
    private readonly appService: SubService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  @Get('sub')
  getHello(
    @Query('name', ParseRequiredPipe) _name: string,
    @Query('age', ParseIntPipe) _age: number,
    @Query('birth-day', ParseOptionalDatePipe) _birthDay: Date,
  ) {
    return this.appService.getTest(_name);
  }
}
