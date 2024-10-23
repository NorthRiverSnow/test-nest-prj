import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from '../env';

export const typeOrm = TypeOrmModule.forRoot({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  database: env.DB_NAME,
  password: env.DB_PASS,
  entities: [],
  synchronize: false,
});
