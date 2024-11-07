import * as fs from 'fs';
import * as path from 'path';

import { CreateEmployeeInfoType } from '../../../entities/decoder/employeeInfo.dto';
import { CreateEmployeeInfoResponsType } from '../../../entities/models/employeeInfo';
import { sequelize, wrapInTransaction } from '../../../infrastracture/orm/Seaquelize';
import { QueryTypes, Transaction } from 'sequelize';

type RequestType = CreateEmployeeInfoType;
type ResponseType = CreateEmployeeInfoResponsType;

const QUERY = fs.readFileSync(path.resolve(__dirname, 'sql/createEmployeeInfo.sql'), {
  encoding: 'utf-8',
  flag: 'r',
});

const insertData = async (input: RequestType[], transaction: Transaction) => {
  const query = QUERY.replace('%values%', ':values');
  return sequelize.query(query, {
    replacements: {
      values: input.map((x) => [x['employee-name'], x['department-id']]),
    },
    raw: true,
    type: QueryTypes.INSERT,
    transaction,
  });
};

const createData = async (input: RequestType[]): Promise<ResponseType> => {
  await wrapInTransaction((t) => insertData(input, t));
  return {
    code: 201,
    body: 'OK',
  };
};

export const createEmployeeInfoSequelize = createData;
