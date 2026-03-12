import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GalponModule } from './modules/galpon/galpon.module';
import { LoteModule } from './modules/lote/lote.module';
import { InsumoModule } from './modules/insumo/insumo.module';
import { InventarioModule } from './modules/inventario/inventario.module';
import { TipoInsumoModule } from './modules/tipo-insumo/tipo-insumo.module';
import { UnidadMedidaModule } from './modules/unidad-medida/unidad-medida.module';
import { ConsumoAlimentoModule } from './modules/consumo-alimento/consumo-alimento.module';
import { EntregasModule } from './modules/entregas/entregas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123',
      database: process.env.DB_NAME || 'avicola_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GalponModule,
    LoteModule,
    InsumoModule,
    InventarioModule,
    TipoInsumoModule,
    UnidadMedidaModule,
    ConsumoAlimentoModule,
    EntregasModule,
  ],
})
export class AppModule {}
