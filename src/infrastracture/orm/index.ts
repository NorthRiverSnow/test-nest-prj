import { DataSource, QueryRunner } from 'typeorm';
import { AsyncLocalStorage } from 'async_hooks';
import { env } from '../env';

// export const typeOrm = TypeOrmModule.forRoot({
//   type: 'mysql',
//   host: env.DB_HOST,
//   port: env.DB_PORT,
//   username: env.DB_USER,
//   database: env.DB_NAME,
//   password: env.DB_PASS,
//   logging: true,
//   entities: [],
//   synchronize: false,
// });

export const typeOrmDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  database: env.DB_NAME,
  password: env.DB_PASS,
  logging: true,
  entities: [],
  synchronize: true,
});

export const getDbConnection = () => {
  if (!typeOrmDataSource.isInitialized) {
    return typeOrmDataSource.initialize();
  }
  return typeOrmDataSource;
};

typeOrmDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export const dbDataSource = new AsyncLocalStorage<{ queryRunner: QueryRunner | null }>();

export const getDbQueryRunner = () => {
  const alsQueryRunner = dbDataSource.getStore()?.queryRunner;
  let queryRunner: QueryRunner;
  if (alsQueryRunner === undefined || alsQueryRunner === null) {
    throw new Error('no database for teset');
  } else {
    queryRunner = alsQueryRunner;
  }
  return queryRunner;
};

export const wrapInTransaction = async <T>(fn: (queryRunner: QueryRunner) => Promise<T>) => {
  const alsQueryRunner = dbDataSource.getStore()?.queryRunner;
  let queryRunner: QueryRunner;
  if (alsQueryRunner === undefined || alsQueryRunner === null) {
    console.log('localstorage');
    queryRunner = typeOrmDataSource.createQueryRunner();
    await queryRunner.connect();
  } else {
    console.log('queryRunner');
    queryRunner = alsQueryRunner;
  }
  try {
    await queryRunner.startTransaction();
    const ret = await fn(queryRunner);
    await queryRunner.commitTransaction();
    return ret;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    if (alsQueryRunner === undefined || alsQueryRunner === null) {
      await queryRunner.release();
    }
  }
};

// @Injectable()
// export class TypeOrmTransaction {
//   constructor(private dataSource: DataSource) {}

//   async wrapInTransaction<T>(fn: (queryRunner: QueryRunner) => Promise<T>) {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       const ret = await fn(queryRunner);
//       await queryRunner.commitTransaction();
//       return ret;
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;
//     } finally {
//       await queryRunner.release();
//     }
//   }
// }

// const startTransaction = () => {
//   const aaa = typeOrm.
//   new TypeOrmTransaction()
// }
