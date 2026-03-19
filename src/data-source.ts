import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Cargamos las variables del archivo .env
dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '5432');
const dbName = process.env.DB_NAME || 'avicola_db'; // Asegúrate que este nombre coincida con tu DB en DataGrip
const dbUser = process.env.DB_USERNAME || 'postgres';
const dbPass = process.env.DB_PASSWORD || '123';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbHost,
  port: dbPort,
  database: dbName,
  username: dbUser,
  password: dbPass,
  synchronize: false, // Las tablas se crean por migraciones, es más seguro
  logging: true,
  // Esta ruta busca entidades tanto en la carpeta 'modules' como en 'usuarios', 'empleados', etc.
  entities: [__dirname + '/**/*.entity{.ts,.js}'], 
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  subscribers: [],
  ssl: false,
});