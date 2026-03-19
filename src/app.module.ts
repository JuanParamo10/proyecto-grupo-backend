import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregasModule } from './modules/entregas/entregas.module';
import { InventarioModule } from './modules/inventario/inventario.module';
import { InsumosModule } from './modules/insumos/insumos.module';
import { EntregasProductoModule } from './modules/entregas-producto/entregas-producto.module';
import { ProduccionModule } from './modules/produccion/produccion.module';
import { LoteModule } from './modules/lote/lote.module';
import { GalponModule } from './modules/galpon/galpon.module';
import { ConsumoAlimentoModule } from './modules/consumo-alimento/consumo-alimento.module';
import { UnidadMedidaModule } from './modules/unidad-medida/unidad-medida.module';
import { TipoInsumoModule } from './modules/tipo-insumo/tipo-insumo.module';
import { Lote } from './modules/lote/entities/lote.entity';
import { Galpon } from './modules/galpon/entities/galpon.entity';
import { ProduccionDiaria } from './modules/produccion/entities/produccion-diaria.entity';
import { Muerte } from './modules/produccion/entities/muerte.entity';
import { ConsumoAlimento } from './modules/consumo-alimento/entities/consumo-alimento.entity';
import { Insumo } from './modules/insumos/entities/insumo.entity';
import { Entrega } from './modules/entregas/entities/entregas.entity';
import { Destinatario } from './modules/entregas-producto/entities/destinatario.entity';
import { EstadoEntrega } from './modules/entregas-producto/entities/estado-entrega.entity';
import { EntregaDetalle } from './modules/entregas-producto/entities/entrega-detalle.entity';
import { EntregaProducto } from './modules/entregas-producto/entities/entrega-producto.entity';
import { TipoInsumo } from './modules/tipo-insumo/entities/tipo-insumo.entity';
import { UnidadMedida } from './modules/unidad-medida/entities/unidad-medida.entity';

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
      entities: [
        Lote,
        Galpon,
        ProduccionDiaria,
        Muerte,
        ConsumoAlimento,
        Insumo,
        Entrega,
        Destinatario,
        EstadoEntrega,
        EntregaDetalle,
        EntregaProducto,
        TipoInsumo,
        UnidadMedida,
      ],
      synchronize: false,
    }),

    LoteModule,
    GalponModule,
    ProduccionModule,
    ConsumoAlimentoModule,
    UnidadMedidaModule,
    TipoInsumoModule,
    EntregasModule,
    InventarioModule,
    InsumosModule,
    EntregasProductoModule,
  ],
})
export class AppModule {}