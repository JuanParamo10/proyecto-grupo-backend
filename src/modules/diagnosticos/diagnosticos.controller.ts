import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosticosService } from './diagnosticos.service';
import { CreateDiagnosticoDto } from './dto/create-diagnostico.dto';

@Controller('diagnosticos')
export class DiagnosticosController {
  constructor(private readonly diagnosticosService: DiagnosticosService) {}

  @Post()
  create(@Body() createDto: CreateDiagnosticoDto) {
    return this.diagnosticosService.create(createDto);
  }

  @Get()
  findAll() {
    return this.diagnosticosService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.diagnosticosService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosticosService.remove(+id);
  }
}