import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregasProductoService } from './entregas-producto.service';
import { EntregasProductoController } from './entregas-producto.controller';
import { EstadoEntrega } from './entities/estado-entrega.entity';
import { Destinatario } from './entities/destinatario.entity';
import { EntregaProducto } from './entities/entrega-producto.entity';
import { EntregaDetalle } from './entities/entrega-detalle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstadoEntrega,
      Destinatario,
      EntregaProducto,
      EntregaDetalle,
    ]),
  ],
  controllers: [EntregasProductoController],
  providers: [EntregasProductoService],
  exports: [EntregasProductoService],
})
export class EntregasProductoModule {}
