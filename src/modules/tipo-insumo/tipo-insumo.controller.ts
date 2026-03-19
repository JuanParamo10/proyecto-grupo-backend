import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TipoInsumoService } from './tipo-insumo.service';
import { CreateTipoInsumoDto } from './dto/create-tipo-insumo.dto';
import { UpdateTipoInsumoDto } from './dto/update-tipo-insumo.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('tipo-insumo')
export class TipoInsumoController {
  constructor(private readonly tipoInsumoService: TipoInsumoService) {}

  @Post()
  create(@Body() createTipoInsumoDto: CreateTipoInsumoDto) {
    return this.tipoInsumoService.create(createTipoInsumoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoInsumoService.findOne(+id);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tipoInsumoService.findAll(paginationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoInsumoService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateTipoInsumoDto: UpdateTipoInsumoDto
  ) {
    return this.tipoInsumoService.update(+id, updateTipoInsumoDto);
  }
}
