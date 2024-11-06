import * as fs from 'fs';
import * as path from 'path';

import { QueryRunner } from 'typeorm';
import { getQueryRunner } from '../../src/infrastracture/orm/typeORM';

export const startTransaction = async (dataFixture: (queryRunner: QueryRunner) => Promise<void>) => {
  const qrDataStore = getQueryRunner();
  if (!qrDataStore) {
    throw new Error('not in local storage context');
  } else {
    await qrDataStore.startTransaction();
    try {
      await dataFixture(qrDataStore);
    } catch (error) {
      console.log(error);
    }
  }
};

export const closeTransaction = async () => {
  const qr = getQueryRunner();
  await qr.rollbackTransaction();
  await qr.release();
};

export const insertFixture = async (qr: QueryRunner, fileName: string, params?: unknown[][]) => {
  const QUERY = fs.readFileSync(path.resolve(__dirname, `sql/insert/${fileName}`), {
    encoding: 'utf-8',
    flag: 'r',
  });
  const splitQueries = QUERY.split('-- $break$\n');

  let index = 0;
  for (const query of splitQueries) {
    await qr.query(query, params ? params[index] : null);
    index++;
  }
};

export const selectFixture = async <T>(qr: QueryRunner, fileName: string, params?: any[]): Promise<T[]> => {
  const QUERY = fs.readFileSync(path.resolve(__dirname, `sql/select/${fileName}`), {
    encoding: 'utf-8',
    flag: 'r',
  });
  return await qr.query(QUERY, params);
};

export const updateFixture = async (qr: QueryRunner, fileName: string, params?: any[]) => {
  const QUERY = fs.readFileSync(path.resolve(__dirname, `sql/update/${fileName}`), {
    encoding: 'utf-8',
    flag: 'r',
  });
  await qr.query(QUERY, params);
};

export const deleteFixture = async (qr: QueryRunner, fileName: string, params?: any[]) => {
  const QUERY = fs.readFileSync(path.resolve(__dirname, `sql/delete/${fileName}`), {
    encoding: 'utf-8',
    flag: 'r',
  });
  await qr.query(QUERY, params);
};
