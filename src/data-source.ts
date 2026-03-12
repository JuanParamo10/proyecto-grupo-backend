import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password123',
  database: 'avicolabase_db',
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'], // Busca todas tus entidades automáticamente
  migrations: ['src/migrations/*.ts'], // Aquí se guardarán las migraciones
});