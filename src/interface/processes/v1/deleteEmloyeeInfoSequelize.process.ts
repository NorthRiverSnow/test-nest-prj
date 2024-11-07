import * as fs from 'fs';
import * as path from 'path';

import { DeleteEmployeeInfoType } from '../../../entities/decoder/employeeInfo.dto';
import { DeleteEmployeeInfoResponsType } from '../../../entities/models/employeeInfo';
import { sequelize, wrapInTransaction } from '../../../infrastracture/orm/Seaquelize';
import { QueryTypes, Transaction } from 'sequelize';

type RequestType = DeleteEmployeeInfoType;
type ResponseType = DeleteEmployeeInfoResponsType;

const QUERY = fs.readFileSync(path.resolve(__dirname, 'sql/deleteEmployeeInfo.sql'), {
  encoding: 'utf-8',
  flag: 'r',
});

const deleteDatabaseData = async (input: RequestType, transaction: Transaction) => {
  return sequelize.query(QUERY, {
    replacements: {
      employeeId: input['employee-id'],
    },
    raw: true,
    type: QueryTypes.DELETE,
    transaction,
  });
};

const deleteData = async (input: RequestType): Promise<ResponseType> => {
  await wrapInTransaction((t) => deleteDatabaseData(input, t));
  return {
    code: 200,
    body: 'OK',
  };
};

export const deleteEmployeeInfoSequelize = deleteData;
