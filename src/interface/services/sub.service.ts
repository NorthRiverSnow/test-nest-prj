import { Injectable } from '@nestjs/common';
import {
  ErrorHandler,
  fnWrapper,
  jsonResponseWithErrorHandler,
  TypeOrmTransaction,
} from './decorator';
import { subResponsType } from 'src/entities/models/sub';

import { Response } from 'express';

type responseType = subResponsType;
// type responseDataType = subResponseDataType;

@Injectable()
export class SubService {
  constructor(
    private typeOrmTransaction: TypeOrmTransaction,
    private readonly errorHandler: ErrorHandler,
  ) {}

  // private getService = async (name: string): Promise<responseType> => {
  //   console.log(name);
  //   const data = await this.typeOrmTransaction.wrapInTransaction<
  //     responseDataType[]
  //   >((qr) => qr.query('select * from t_test'));
  //   return {
  //     code: 200,
  //     body: data,
  //   };
  // };

  private getService = async (name: string): Promise<responseType> => {
    return { code: 200, body: `the recieved name is ${name}` };
  };
  getTestUsingErrorClass = async (res: Response, name: string) =>
    this.errorHandler.handleErrorWithJsonResponse(
      res,
      fnWrapper(this.getService(name)),
    );

  getTestUsingErrorFunction = async (res: Response, name: string) =>
    jsonResponseWithErrorHandler(res, fnWrapper(this.getService(name)));
}
