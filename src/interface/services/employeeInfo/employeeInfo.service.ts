import { Response } from 'express';

import { Injectable } from '@nestjs/common';
import { fnWrapper, jsonResponseWithErrorHandler } from '../decorator';

import { CreateEmployeeInfoType, GetEmployeeInfoType } from '../../../entities/decoder/employeeInfo.dto';
import { getEmployeeInfoTypeOrm as getEmployeeInfoTypeOrm } from '../../../processes/getEmloyeeInfoTypeOrm.process';
import { createEmployeeInfoTypeOrm as createEmployeeInfoTypeOrm } from '../../../processes/createEmloyeeInfoTypeOrm.process';
import { getEmployeeInfoSequelize } from '../../../processes/getEmloyeeInfoSequelize.process';
import { createEmployeeInfoSequelize } from '../../../processes/createEmloyeeInfoSequelize.process';

type GetRequestType = GetEmployeeInfoType;
type CreateRequestType = CreateEmployeeInfoType;

@Injectable()
export class EmployeeInfoService {
  getEmployeeInfoServiceTypeOrm = async (res: Response, input: GetRequestType) =>
    jsonResponseWithErrorHandler(res, fnWrapper(getEmployeeInfoTypeOrm(input)));

  getEmployeeInfoServiceSequelize = async (res: Response, input: GetRequestType) =>
    jsonResponseWithErrorHandler(res, fnWrapper(getEmployeeInfoSequelize(input)));

  createEmployeeInfoServiceTypeOrm = async (res: Response, input: CreateRequestType[]) =>
    jsonResponseWithErrorHandler(res, fnWrapper(createEmployeeInfoTypeOrm(input)));

  createEmployeeInfoServiceSequelize = async (res: Response, input: CreateRequestType[]) =>
    jsonResponseWithErrorHandler(res, fnWrapper(createEmployeeInfoSequelize(input)));
}
