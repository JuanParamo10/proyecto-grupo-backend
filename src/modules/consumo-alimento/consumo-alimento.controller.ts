import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { ConsumoAlimentoService } from './consumo-alimento.service';
import { CreateConsumoAlimentoDto } from './dto/create-consumo-alimento.dto';
import { UpdateConsumoAlimentoDto } from './dto/update-consumo-alimento.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('consumo-alimento')
export class ConsumoAlimentoController {
  constructor(private readonly consumoAlimentoService: ConsumoAlimentoService) {}

  @Post()
  create(@Body() createConsumoAlimentoDto: CreateConsumoAlimentoDto) {
    return this.consumoAlimentoService.create(createConsumoAlimentoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumoAlimentoService.findOne(+id);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.consumoAlimentoService.findAll(paginationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumoAlimentoService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateConsumoAlimentoDto: UpdateConsumoAlimentoDto
  ) {
    return this.consumoAlimentoService.update(+id, updateConsumoAlimentoDto);
  }
}
