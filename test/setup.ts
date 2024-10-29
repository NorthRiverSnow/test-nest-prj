import { dbDataSource, getDbConnection } from '../src/infrastracture/orm';

beforeAll(async () => {
  const qr = await getDbConnection().then((conn) => conn.createQueryRunner());
  await qr.connect();
  dbDataSource.setQueryRunner(qr);
});

afterAll(async () => {
  try {
    const conn = await getDbConnection();
    await conn.destroy();
    dbDataSource.setQueryRunner(null);
  } catch (error) {
    console.log(error);
  }
});
