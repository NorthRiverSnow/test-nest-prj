import * as fs from 'fs';
import * as path from 'path';

import { QueryRunner, InsertResult } from 'typeorm';
import { CreateEmployeeInfoType } from '../../../entities/decoder/employeeInfo.dto';
import { CreateEmployeeInfoResponsType } from '../../../entities/models/employeeInfo';
import { setValuesBinds, wrapInTransaction } from '../../../infrastracture/orm/typeORM';

type RequestType = CreateEmployeeInfoType;
type ResponseType = CreateEmployeeInfoResponsType;

const QUERY = fs.readFileSync(path.resolve(__dirname, 'sql/createEmployeeInfo.sql'), {
  encoding: 'utf-8',
  flag: 'r',
});

const insertData = async (input: RequestType[], qr: QueryRunner): Promise<InsertResult> => {
  const query = QUERY.replace('%values%', setValuesBinds(input));
  return qr.query(
    query,
    input.flatMap((x) => [x['employee-name'], x['department-id']]),
  );
};

const createData = async (input: RequestType[]): Promise<ResponseType> => {
  await wrapInTransaction((qr) => insertData(input, qr));
  return {
    code: 201,
    body: 'OK',
  };
};

export const createEmployeeInfoTypeOrm = createData;
