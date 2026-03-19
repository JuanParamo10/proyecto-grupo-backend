import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEmpleadoService } from './estado-empleado.service';
import { EstadoEmpleadoController } from './estado-empleado.controller';
import { EstadoEmpleado } from './entities/estado-empleado.entity';

@Module({
  // ¡ESTA ES LA LÍNEA MÁGICA QUE FALTA! Registramos la entidad aquí.
  imports: [TypeOrmModule.forFeature([EstadoEmpleado])],
  controllers: [EstadoEmpleadoController],
  providers: [EstadoEmpleadoService],
})
export class EstadoEmpleadoModule {}