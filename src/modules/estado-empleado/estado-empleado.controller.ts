import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoEmpleadoService } from './estado-empleado.service';
import { CreateEstadoEmpleadoDto } from './dto/create-estado-empleado.dto';

@Controller('estado-empleado')
export class EstadoEmpleadoController {
  constructor(private readonly estadoEmpleadoService: EstadoEmpleadoService) {}

  @Post()
  create(@Body() createEstadoEmpleadoDto: CreateEstadoEmpleadoDto) {
    return this.estadoEmpleadoService.create(createEstadoEmpleadoDto);
  }

  @Get()
  findAll() {
    return this.estadoEmpleadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoEmpleadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoEmpleadoDto: any) {
    return this.estadoEmpleadoService.update(+id, updateEstadoEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoEmpleadoService.remove(+id);
  }
}