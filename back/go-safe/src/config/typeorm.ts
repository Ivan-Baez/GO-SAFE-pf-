import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';

dotenvConfig({ path: '.development.env' });
const isProduction = process.env.NODE_ENV === 'production';

export const config = {
  type: 'postgres',

  ...(process.env.DATABASE_URL
    ? {
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      }),
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  dropSchema: true,
  synchronize: true,
  logging: true,
  migrations: [],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
