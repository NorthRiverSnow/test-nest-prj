import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get('/health-check')
  healthCheck(@Res() res: Response) {
    return res.status(200).json('OK');
  }
}
