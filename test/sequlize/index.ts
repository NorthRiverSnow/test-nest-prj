import * as fs from 'fs';
import * as path from 'path';

import { getTransaction, globalTransaction, sequelize } from '../../src/infrastracture/orm/Seaquelize';
import { QueryTypes, Transaction } from 'sequelize';

export const startTransaction = async (dataFixture: (transaction: Transaction) => Promise<void>) => {
  try {
    const transaction = await sequelize.transaction();
    globalTransaction.setTransaction(transaction);
    await dataFixture(transaction);
  } catch (error) {
    console.log(error);
  }
};

export const closeTransaction = async () => {
  const transaction = getTransaction();
  await transaction.rollback();
};

export const insertFixture = async (
  fileName: string,
  transaction: Transaction,
  replacements?: Record<string, string | number | Date>[],
) => {
  const QUERY = fs.readFileSync(path.resolve(__dirname, `sql/insert/${fileName}`), {
    encoding: 'utf-8',
    flag: 'r',
  });
  const splitQueries = QUERY.split('-- $break$\n');

  let index = 0;
  for (const query of splitQueries) {
    await sequelize.query(query, {
      replacements: replacements ? replacements[index] : undefined,
      raw: true,
      type: QueryTypes.INSERT,
      transaction,
    });
    index++;
  }
};

export const selectFixture = async <T extends object>(
  fileName: string,
  transaction: Transaction,
  replacements?: Record<string, string | number | Date>,
): Promise<T[]> => {
  const QUERY = fs.readFileSync(path.resolve(__dirname, `sql/select/${fileName}`), {
    encoding: 'utf-8',
    flag: 'r',
  });
  return await sequelize.query<T>(QUERY, {
    replacements,
    raw: true,
    type: QueryTypes.SELECT,
    transaction,
  });
};

export const updateFixture = async (
  fileName: string,
  transaction: Transaction,
  replacements?: Record<string, string | number | Date>,
) => {
  const QUERY = fs.readFileSync(path.resolve(__dirname, `sql/update/${fileName}`), {
    encoding: 'utf-8',
    flag: 'r',
  });
  return sequelize.query(QUERY, {
    replacements,
    raw: true,
    type: QueryTypes.UPDATE,
    transaction,
  });
};

export const deleteFixture = async (
  fileName: string,
  transaction: Transaction,
  replacements?: Record<string, string | number | Date>,
) => {
  const QUERY = fs.readFileSync(path.resolve(__dirname, `sql/delete/${fileName}`), {
    encoding: 'utf-8',
    flag: 'r',
  });
  return sequelize.query(QUERY, {
    replacements,
    raw: true,
    type: QueryTypes.DELETE,
    transaction,
  });
};
