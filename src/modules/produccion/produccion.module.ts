import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduccionService } from './produccion.service';
import { ProduccionController } from './produccion.controller';
import { ProduccionDiaria } from './entities/produccion-diaria.entity';
import { Muerte } from './entities/muerte.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProduccionDiaria,
      Muerte,
    ]),
  ],
  controllers: [ProduccionController],
  providers: [ProduccionService],
  exports: [ProduccionService],
})
export class ProduccionModule {}
