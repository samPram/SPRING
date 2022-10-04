import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => ({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migration_table',
  synchronize: true,
  logging: true,
  cli: {
    migrationsDir: 'src/database/migrations', // This path will be used by typeorm cli when we create a new migration
  },
}));
