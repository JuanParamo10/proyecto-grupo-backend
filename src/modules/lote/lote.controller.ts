import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { LoteService } from './lote.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post()
  create(@Body() createLoteDto: CreateLoteDto) {
    return this.loteService.create(createLoteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loteService.findOne(+id);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.loteService.findAll(paginationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loteService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateLoteDto: UpdateLoteDto
  ) {
    return this.loteService.update(+id, updateLoteDto);
  }
}
