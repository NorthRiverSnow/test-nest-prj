import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrm = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'test',
  entities: [],
  synchronize: false,
});
