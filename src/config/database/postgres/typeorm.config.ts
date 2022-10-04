import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import configuration from './configuration';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { DataSource } from 'typeorm';
dotenv.config();

const typeOrmConfig: PostgresConnectionOptions = configuration();

export default new DataSource(typeOrmConfig);
