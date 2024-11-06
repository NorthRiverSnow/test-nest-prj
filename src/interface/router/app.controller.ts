import { Controller, Get, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @ApiOperation({ summary: 'ヘルスチェック', description: 'APIサーバーの稼働を確認するAPI' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', description: 'Bearer token', required: true })
  @Get('/health-check')
  healthCheck(@Res() res: Response) {
    return res.status(200).json('OK');
  }
}
