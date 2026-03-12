import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsumoService } from './insumo.service';
import { InsumoController } from './insumo.controller';
import { Insumo } from './entities/insumo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Insumo])
  ],
  controllers: [InsumoController],
  providers: [InsumoService],
})
export class InsumoModule {}
