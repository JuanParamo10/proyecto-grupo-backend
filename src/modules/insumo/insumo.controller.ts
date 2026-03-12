import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { InsumoService } from './insumo.service';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('insumo')
export class InsumoController {
  constructor(private readonly insumoService: InsumoService) {}

  @Post()
  create(@Body() createInsumoDto: CreateInsumoDto) {
    return this.insumoService.create(createInsumoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insumoService.findOne(+id);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.insumoService.findAll(paginationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insumoService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateInsumoDto: UpdateInsumoDto
  ) {
    return this.insumoService.update(+id, updateInsumoDto);
  }
}
