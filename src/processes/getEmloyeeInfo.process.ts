import * as fs from 'fs';
import * as path from 'path';

import { QueryRunner } from 'typeorm';
import { GetEmployeeInfoType } from '../entities/decoder/employeeInfo.dto';
import {
  GetEmployeeInfoResponsType,
  GetEmployeeInfoResponseDataType,
  EmployeeInfoDatabaseType,
} from '../entities/models/employeeInfo';
import { wrapInTransaction } from '../infrastracture/orm';

type requestType = GetEmployeeInfoType;
type responseType = GetEmployeeInfoResponsType;
type responseDataType = GetEmployeeInfoResponseDataType;
type databaseType = EmployeeInfoDatabaseType;

const QUERY = fs.readFileSync(path.resolve(__dirname, 'sql/getEmployeeInfo.sql'), {
  encoding: 'utf-8',
  flag: 'r',
});
const getDatabaseData = async (input: requestType, qr: QueryRunner): Promise<databaseType[]> => {
  const query =
    input['department-id'] === undefined
      ? QUERY.replace('%departmentIdFileter%', 'true')
      : QUERY.replace('%departmentIdFileter%', 'department_id = ?');
  return qr.query(query, [input['department-id']]);
};

const transform = (data: databaseType[]) =>
  data.map<responseDataType>((x) => ({
    'employee-id': x.EMPLOYEE_ID,
    'employee-name': x.EMPLOYEE_NAME,
    'department-id': x.DEPARTMENT_ID,
  }));

const getData = async (input: requestType): Promise<responseType> => {
  const data = await wrapInTransaction((qr) => getDatabaseData(input, qr)).then(transform);
  return {
    code: 200,
    body: data,
  };
};

export const getEmployeeInfo = getData;
