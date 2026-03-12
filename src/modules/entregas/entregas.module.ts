import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregasService } from './entregas.service';
import { EntregasController } from './entregas.controller';
import { Entrega } from './entities/entregas.entity'; 
import { InsumosModule } from '../insumos/insumos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entrega]),
    InsumosModule,
  ],
  controllers: [EntregasController],
  providers: [EntregasService],
})
export class EntregasModule {}