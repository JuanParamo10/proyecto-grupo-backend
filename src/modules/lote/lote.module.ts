import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteService } from './lote.service';
import { LoteController } from './lote.controller';
import { Lote } from './entities/lote.entity';

@Module({
  imports: [
    // 💡 Esta es la pieza clave que falta: registra la entidad Lote 
    // para que TypeORM la cree en la base de datos automáticamente.
    TypeOrmModule.forFeature([Lote])
  ],
  controllers: [LoteController],
  providers: [LoteService],
  // Exportamos TypeOrmModule por si el módulo de 'Producción' 
  // o 'Consumo' necesitan buscar lotes.
  exports: [TypeOrmModule, LoteService], 
})
export class LoteModule {}