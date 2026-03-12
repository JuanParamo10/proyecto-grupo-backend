import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { UnidadMedidaService } from './unidad-medida.service';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('unidad-medida')
export class UnidadMedidaController {
  constructor(private readonly unidadMedidaService: UnidadMedidaService) {}

  @Post()
  create(@Body() createUnidadMedidaDto: CreateUnidadMedidaDto) {
    return this.unidadMedidaService.create(createUnidadMedidaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadMedidaService.findOne(+id);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.unidadMedidaService.findAll(paginationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadMedidaService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateUnidadMedidaDto: UpdateUnidadMedidaDto
  ) {
    return this.unidadMedidaService.update(+id, updateUnidadMedidaDto);
  }
}
