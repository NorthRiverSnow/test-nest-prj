import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

import { Injectable } from '@nestjs/common';
import { fnWrapper, jsonResponseWithErrorHandler } from '../decorator';
import {
  getEmployeeInfoDatabaseType,
  getEmployeeInfoResponseDataType,
  getEmployeeInfoResponsType,
} from '../../../../src/entities/models/employeeInfo';

import { wrapInTransaction } from '../../../../src/infrastracture/orm';
import { QueryRunner } from 'typeorm';
import { GetEmployeeInfoType } from '../../../../src/entities/decoder/employeeInfo.dto';

type requestType = GetEmployeeInfoType;
type responseType = getEmployeeInfoResponsType;
type responseDataType = getEmployeeInfoResponseDataType;
type databaseType = getEmployeeInfoDatabaseType;

const QUERY = fs.readFileSync(path.resolve(__dirname, 'sql/getEmployeeInfo.sql'), {
  encoding: 'utf-8',
  flag: 'r',
});
@Injectable()
export class GetEmployeeInfoService {
  private getDatabaseData = async (input: requestType, qr: QueryRunner): Promise<databaseType[]> => {
    const query =
      input['department-id'] === undefined
        ? QUERY.replace('%departmentIdFileter%', 'true')
        : QUERY.replace('%departmentIdFileter%', 'department_id = ?');
    return qr.query(query, [input['department-id']]);
  };

  private transform = (data: databaseType[]) =>
    data.map<responseDataType>((x) => ({
      'employee-id': x.EMPLOYEE_ID,
      'employee-name': x.EMPLOYEE_NAME,
      'department-id': x.DEPARTMENT_ID,
    }));

  private getData = async (input: requestType): Promise<responseType> => {
    const data = await wrapInTransaction((qr) => this.getDatabaseData(input, qr)).then(this.transform);
    return {
      code: 200,
      body: data,
    };
  };

  private getService = async (input: requestType) => {
    return {
      code: 200,
      body: input,
    };
  };

  getEmployeeInfo = this.getData;

  getEmproyeeInfoService = async (res: Response, input: requestType) =>
    jsonResponseWithErrorHandler(res, fnWrapper(this.getData(input)));
}
