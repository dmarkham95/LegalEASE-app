import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { SearchHistory } from '../entities/searchHistory.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, SearchHistory],
  synchronize: false, // Set to false in production
  migrations: ['src/migrations/*.ts'] // Migration files
});