import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregasModule } from './modules/entregas/entregas.module';
import { InventarioModule } from './modules/inventario/inventario.module';
import { InsumosModule } from './modules/insumos/insumos.module';
import { EntregasProductoModule } from './modules/entregas-producto/entregas-producto.module';
import { ProduccionModule } from './modules/produccion/produccion.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    EntregasModule,
    InventarioModule,
    InsumosModule,
    EntregasProductoModule,
    ProduccionModule,
  ],
})
export class AppModule {}