import { globalTransaction } from '../src/infrastracture/orm/Seaquelize';
import { dbDataSource, getDbConnection } from '../src/infrastracture/orm/typeORM';

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
    globalTransaction.setTransaction(null);
  } catch (error) {
    console.log(error);
  }
});
