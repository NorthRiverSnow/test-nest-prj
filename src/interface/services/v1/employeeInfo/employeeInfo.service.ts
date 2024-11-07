import { Response } from 'express';

import { Injectable } from '@nestjs/common';
import { fnWrapper, jsonResponseWithErrorHandler } from '../../decorator';

import { CreateEmployeeInfoType, GetEmployeeInfoType } from '../../../../entities/decoder/employeeInfo.dto';
import { getEmployeeInfoTypeOrm } from '../../../processes/v1/getEmloyeeInfoTypeOrm.process';
import { getEmployeeInfoSequelize } from '../../../processes/v1/getEmloyeeInfoSequelize.process';
import { createEmployeeInfoSequelize } from '../../../processes/v1/createEmloyeeInfoSequelize.process';
import { createEmployeeInfoTypeOrm } from '../../../processes/v1/createEmloyeeInfoTypeOrm.process';
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
