import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';

dotenvConfig({ path: '.development.env' });
const isProduction = process.env.ENV === 'production';

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
  autoLoadEntities: true,
  dropSchema: stringToBoolean(process.env.DB_DROP_SCHEMA) && isProduction,
  synchronize: stringToBoolean(process.env.DB_SYNCHONIZE) && isProduction,
  logging: stringToBoolean(process.env.DB_LOGGING) && isProduction,
  migrations: [],
};

function stringToBoolean(envvar?: string): boolean {
  return envvar && envvar === 'true' ? true : false;
}

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
