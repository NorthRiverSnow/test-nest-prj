import * as fs from 'fs';
import * as path from 'path';

import { QueryRunner } from 'typeorm';
import { GetEmployeeInfoType } from '../../../entities/decoder/employeeInfo.dto';
import { GetEmployeeInfoResponsTypeV2, GetEmployeeInfoResponseDataTypeV2 } from '../../../entities/models/employeeInfo';
import { wrapInTransaction } from '../../../infrastracture/orm/typeORM';

type requestType = GetEmployeeInfoType;
type responseType = GetEmployeeInfoResponsTypeV2;
type responseDataType = GetEmployeeInfoResponseDataTypeV2;

const QUERY = fs.readFileSync(path.resolve(__dirname, 'sql/getEmployeeInfo.sql'), {
  encoding: 'utf-8',
  flag: 'r',
});
const getDatabaseData = async (input: requestType, qr: QueryRunner): Promise<responseDataType[]> => {
  const query =
    input['department-id'] === undefined
      ? QUERY.replace('%departmentIdFileter%', 'true')
      : QUERY.replace('%departmentIdFileter%', 'e.department_id = ?');
  return qr.query(query, [input['department-id']]);
};

const getData = async (input: requestType): Promise<responseType> => {
  const data = await wrapInTransaction((qr) => getDatabaseData(input, qr));
  return {
    code: 200,
    body: data,
  };
};

export const getEmployeeInfoTypeOrm = getData;
