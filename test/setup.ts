import { QueryRunner } from 'typeorm';
import { dbDataSource, getDbQueryRunner, typeOrmDataSource } from '../src/infrastracture/orm';

beforeAll(() => {
  console.log('test');
  const store: { queryRunner: QueryRunner | null } = { queryRunner: null };
  dbDataSource.run(store, async () => {
    await typeOrmDataSource
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    const queryRunner = typeOrmDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return { queryRunner };
  });
  const data = dbDataSource.getStore();
  console.log(data);
});

afterAll(async () => {
  console.log('finish');
  const queryRunner = getDbQueryRunner();
  await queryRunner.rollbackTransaction();
  await queryRunner.release();
});
