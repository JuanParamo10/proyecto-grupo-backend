import { Injectable } from '@nestjs/common';
import { CreateEstadoEmpleadoDto } from './dto/create-estado-empleado.dto';
import { UpdateEstadoEmpleadoDto } from './dto/update-estado-empleado.dto';

@Injectable()
export class EstadoEmpleadoService {
  create(createEstadoEmpleadoDto: CreateEstadoEmpleadoDto) {
    return 'This action adds a new estadoEmpleado';
  }

  findAll() {
    return `This action returns all estadoEmpleado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoEmpleado`;
  }

  update(id: number, updateEstadoEmpleadoDto: UpdateEstadoEmpleadoDto) {
    return `This action updates a #${id} estadoEmpleado`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoEmpleado`;
  }
}
