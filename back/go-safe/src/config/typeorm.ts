import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';

dotenvConfig({ path: '.development.env' });

export const config = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
