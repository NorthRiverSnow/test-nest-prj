import * as fs from 'fs';
import * as path from 'path';

import { GetEmployeeInfoType } from '../../../entities/decoder/employeeInfo.dto';
import {
  GetEmployeeInfoResponsType,
  GetEmployeeInfoResponseDataType,
  EmployeeInfoDatabaseType,
} from '../../../entities/models/employeeInfo';
import { sequelize, wrapInTransaction } from '../../../infrastracture/orm/Seaquelize';
import { QueryTypes, Transaction } from 'sequelize';

type requestType = GetEmployeeInfoType;
type responseType = GetEmployeeInfoResponsType;
type responseDataType = GetEmployeeInfoResponseDataType;
type databaseType = EmployeeInfoDatabaseType;

const QUERY = fs.readFileSync(path.resolve(__dirname, 'sql/getEmployeeInfo.sql'), {
  encoding: 'utf-8',
  flag: 'r',
});
const getDatabaseData = async (input: requestType, transaction: Transaction): Promise<databaseType[]> => {
  const query =
    input['department-id'] === undefined
      ? QUERY.replace('%departmentIdFileter%', 'true')
      : QUERY.replace('%departmentIdFileter%', 'department_id = :departmentId');
  return sequelize.query<databaseType>(query, {
    replacements: {
      departmentId: input['department-id'],
    },
    raw: true,
    type: QueryTypes.SELECT,
    transaction,
  });
};

const transform = (data: databaseType[]) =>
  data.map<responseDataType>((x) => ({
    'employee-id': x.EMPLOYEE_ID,
    'employee-name': x.EMPLOYEE_NAME,
    'department-id': x.DEPARTMENT_ID,
  }));

const getData = async (input: requestType): Promise<responseType> => {
  const data = await wrapInTransaction((t) => getDatabaseData(input, t)).then(transform);
  return {
    code: 200,
    body: data,
  };
};

export const getEmployeeInfoSequelize = getData;
