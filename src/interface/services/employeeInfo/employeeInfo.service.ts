import { Response } from 'express';

import { Injectable } from '@nestjs/common';
import { fnWrapper, jsonResponseWithErrorHandler } from '../decorator';

import { CreateEmployeeInfoType, GetEmployeeInfoType } from '../../../entities/decoder/employeeInfo.dto';
import { getEmployeeInfo } from '../../../processes/getEmloyeeInfo.process';
import { createEmployeeInfo } from '../../../processes/createEmloyeeInfo.process';

type GetrequestType = GetEmployeeInfoType;
type CreateRequestType = CreateEmployeeInfoType;

@Injectable()
export class EmployeeInfoService {
  getEmproyeeInfoService = async (res: Response, input: GetrequestType) =>
    jsonResponseWithErrorHandler(res, fnWrapper(getEmployeeInfo(input)));

  createEmproyeeInfoService = async (res: Response, input: CreateRequestType[]) =>
    jsonResponseWithErrorHandler(res, fnWrapper(createEmployeeInfo(input)));
}
