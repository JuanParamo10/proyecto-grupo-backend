import { Controller, Get, Post, Body, Param, Delete, Patch, Query, BadRequestException } from '@nestjs/common';
import { EntregasService } from './entregas.service';
import { CreateEntregaDto } from './dto/create-entregas.dto';
import { UpdateEntregaDto } from './dto/update-entregas.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('entregas') 
export class EntregasController {
  constructor(private readonly entregasService: EntregasService) {}

  // 1. SIEMPRE primero las rutas estáticas
  @Get('reporte/hoy')
  getToday() {
    return this.entregasService.findToday();
  }

  // 2. Rutas generales
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.entregasService.findAll(paginationDto);
  }

  @Post()
  create(@Body() createEntregaDto: CreateEntregaDto) {
    return this.entregasService.create(createEntregaDto);
  }

  // 3. Rutas con parámetros (:id) al final
  @Get(':id')
  findOne(@Param('id') id: string) {
    const numId = +id;
    if (isNaN(numId)) {
      throw new BadRequestException(`El ID "${id}" debe ser un número válido`);
    }
    return this.entregasService.findOne(numId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const numId = +id;
    if (isNaN(numId)) {
      throw new BadRequestException(`El ID "${id}" no es un número válido para eliminar`);
    }
    return this.entregasService.remove(numId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateEntregaDto: UpdateEntregaDto
  ) {
    const numId = +id;
    if (isNaN(numId)) {
      throw new BadRequestException(`El ID "${id}" no es un número válido para actualizar`);
    }
    return this.entregasService.update(numId, updateEntregaDto);
  }
}