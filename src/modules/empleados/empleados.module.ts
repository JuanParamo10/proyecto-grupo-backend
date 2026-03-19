import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- Importar esto
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { Empleado } from './entities/empleado.entity'; // <-- Importar tu entidad

@Module({
  // Tienes que registrar la entidad aquí, igual que hicimos con usuarios:
  imports: [TypeOrmModule.forFeature([Empleado])], 
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
})
export class EmpleadosModule {}