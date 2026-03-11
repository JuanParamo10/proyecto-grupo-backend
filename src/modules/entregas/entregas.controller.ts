import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';import { EntregasService } from './entregas.service';
import { CreateEntregaDto } from './dto/create-entregas.dto';
import { UpdateEntregaDto } from './dto/update-entregas.dto';
import { NotFoundException } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';


@Controller('entregas') 
export class EntregasController {
  constructor(private readonly entregasService: EntregasService) {}

  @Post()
  create(@Body() createEntregaDto: CreateEntregaDto) {
    return this.entregasService.create(createEntregaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregasService.findOne(+id);
  }

  @Get()
findAll(@Query() paginationDto: PaginationDto) {
  return this.entregasService.findAll(paginationDto);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entregasService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateEntregaDto: UpdateEntregaDto
  ) {
    return this.entregasService.update(+id, updateEntregaDto);
  }

  
}