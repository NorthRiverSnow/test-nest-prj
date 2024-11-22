import { DataSource, QueryRunner } from "typeorm"
import { env } from "../../env"

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

export const typeOrm = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  database: env.DB_NAME,
  password: env.DB_PASS,
  logging: true,
  entities: [],
  synchronize: true,
})

export const getDbConnection = (): Promise<DataSource> => {
  if (!typeOrm.isInitialized) {
    return typeOrm.initialize()
  }
  return Promise.resolve(typeOrm)
}

export class GlobalStore {
  private qr: QueryRunner | null
  constructor() {
    this.qr = null
  }

  setQueryRunner = (qr: QueryRunner | null) => {
    this.qr = qr
  }

  get queryRunner() {
    return this.qr
  }
}

export const dbDataSource = new GlobalStore()

export const getQueryRunner = () => {
  if (dbDataSource.queryRunner === null) {
    throw new Error("no test store")
  }
  return dbDataSource.queryRunner
}

export const wrapInTransaction = async <T>(fn: (queryRunner: QueryRunner) => Promise<T>) => {
  const globalQueryRunner = dbDataSource.queryRunner
  let queryRunner: QueryRunner
  if (globalQueryRunner === null) {
    queryRunner = await getDbConnection().then((conn) => conn.createQueryRunner())
    await queryRunner.connect()
  } else {
    queryRunner = globalQueryRunner
  }
  try {
    await queryRunner.startTransaction()
    const ret = await fn(queryRunner)
    await queryRunner.commitTransaction()
    return ret
  } catch (error) {
    await queryRunner.rollbackTransaction()
    throw error
  } finally {
    if (globalQueryRunner === undefined || globalQueryRunner === null) {
      await queryRunner.release()
    }
  }
}

export const setValuesBinds = <T extends object>(input: T[]): string => {
  return input
    .map(
      (x) =>
        `(${Object.keys(x)
          .map(() => "?")
          .join(",")})`,
    )
    .join(",")
}

export type InsertResult = {
  fieldCount: number
  affectedRows: number
  insertId: number
  serverStatus: number
  warningCount: number
  message: string
  protocol41: boolean
  changedRows: number
}
