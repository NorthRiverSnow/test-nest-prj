import * as fs from 'fs';
import * as path from 'path';

import { QueryRunner } from 'typeorm';
import { getQueryRunner } from '../../src/infrastracture/orm';

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

export const insertFixture = async (qr: QueryRunner, fileName: string, params?: any[]) => {
  const QUERY = fs.readFileSync(path.resolve(__dirname, `sql/insert/${fileName}`), {
    encoding: 'utf-8',
    flag: 'r',
  });
  await qr.query(QUERY, params);
};
