import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lote } from './entities/lote.entity';
import { GalponModule } from '../galpon/galpon.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lote]),
    GalponModule,
  ],
})
export class LoteModule {}