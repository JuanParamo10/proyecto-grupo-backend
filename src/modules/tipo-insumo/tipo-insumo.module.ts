import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoInsumoService } from './tipo-insumo.service';
import { TipoInsumoController } from './tipo-insumo.controller';
import { TipoInsumo } from './entities/tipo-insumo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoInsumo])
  ],
  controllers: [TipoInsumoController],
  providers: [TipoInsumoService],
})
export class TipoInsumoModule {}
