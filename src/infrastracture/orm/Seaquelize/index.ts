import { env } from '../../env';
import { Sequelize, Transaction } from 'sequelize';

export const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: 'mysql',
  logging: (msg) => console.log(msg),
});

export class GlobalStore {
  private t: Transaction | null;
  constructor() {
    this.t = null;
  }
  setTransaction = (transaction: Transaction) => {
    this.t = transaction;
  };
  get transaction() {
    return this.t;
  }
}

export const globalTransaction = new GlobalStore();

export const getTransaction = () => {
  if (globalTransaction.transaction === null) {
    throw new Error('no test store');
  }
  return globalTransaction.transaction;
};

export const wrapInTransaction = async <T>(fn: (transaction: Transaction) => Promise<T>) => {
  try {
    if (globalTransaction.transaction === null) {
      return await sequelize.transaction(fn);
    } else {
      return await sequelize.transaction({ transaction: globalTransaction.transaction }, fn);
    }
  } catch (error) {
    throw error;
  }
};
