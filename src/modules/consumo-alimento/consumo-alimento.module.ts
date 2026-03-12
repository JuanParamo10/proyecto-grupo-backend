import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumoAlimentoService } from './consumo-alimento.service';
import { ConsumoAlimentoController } from './consumo-alimento.controller';
import { ConsumoAlimento } from './entities/consumo-alimento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsumoAlimento])
  ],
  controllers: [ConsumoAlimentoController],
  providers: [ConsumoAlimentoService],
})
export class ConsumoAlimentoModule {}
