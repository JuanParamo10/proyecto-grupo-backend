import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoEmpleadoDto } from './create-estado-empleado.dto';

export class UpdateEstadoEmpleadoDto extends PartialType(CreateEstadoEmpleadoDto) {}
