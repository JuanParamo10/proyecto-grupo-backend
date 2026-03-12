import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProduccionService } from './produccion.service';
import { CreateProduccionDiariaDto } from './dto/create-produccion-diaria.dto';
import { CreateMuerteDto } from './dto/create-muerte.dto';
import { UpdateProduccionDiariaDto, UpdateMuerteDto } from './dto/update-produccion.dto';

@Controller('produccion')
export class ProduccionController {
  constructor(private readonly produccionService: ProduccionService) {}

  // ==================== PRODUCCIÓN DIARIA ====================
  @Post('diaria')
  async createProduccionDiaria(@Body() createDto: CreateProduccionDiariaDto) {
    return await this.produccionService.createProduccionDiaria(createDto);
  }

  @Get('diaria')
  async findAllProduccionDiaria() {
    return await this.produccionService.findAllProduccionDiaria();
  }

  @Get('diaria/:id')
  async findOneProduccionDiaria(@Param('id', ParseIntPipe) id: number) {
    return await this.produccionService.findOneProduccionDiaria(id);
  }

  @Put('diaria/:id')
  async updateProduccionDiaria(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProduccionDiariaDto,
  ) {
    return await this.produccionService.updateProduccionDiaria(id, updateDto);
  }

  @Delete('diaria/:id')
  async removeProduccionDiaria(@Param('id', ParseIntPipe) id: number) {
    return await this.produccionService.removeProduccionDiaria(id);
  }

  @Get('diaria/lote/:loteId')
  async findProduccionByLote(@Param('loteId', ParseIntPipe) loteId: number) {
    return await this.produccionService.findProduccionByLote(loteId);
  }

  @Get('diaria/fecha')
  async findProduccionByFecha(
    @Query('inicio') fechaInicio: string,
    @Query('fin') fechaFin: string,
  ) {
    return await this.produccionService.findProduccionByFecha(fechaInicio, fechaFin);
  }

  // ==================== MUERTE ====================
  @Post('muerte')
  async createMuerte(@Body() createDto: CreateMuerteDto) {
    return await this.produccionService.createMuerte(createDto);
  }

  @Get('muerte')
  async findAllMuerte() {
    return await this.produccionService.findAllMuerte();
  }

  @Get('muerte/:id')
  async findOneMuerte(@Param('id', ParseIntPipe) id: number) {
    return await this.produccionService.findOneMuerte(id);
  }

  @Put('muerte/:id')
  async updateMuerte(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMuerteDto,
  ) {
    return await this.produccionService.updateMuerte(id, updateDto);
  }

  @Delete('muerte/:id')
  async removeMuerte(@Param('id', ParseIntPipe) id: number) {
    return await this.produccionService.removeMuerte(id);
  }

  @Get('muerte/lote/:loteId')
  async findMuerteByLote(@Param('loteId', ParseIntPipe) loteId: number) {
    return await this.produccionService.findMuerteByLote(loteId);
  }

  @Get('muerte/fecha')
  async findMuerteByFecha(
    @Query('inicio') fechaInicio: string,
    @Query('fin') fechaFin: string,
  ) {
    return await this.produccionService.findMuerteByFecha(fechaInicio, fechaFin);
  }

  @Get('muerte/total/:loteId')
  async getTotalMuertesByLote(@Param('loteId', ParseIntPipe) loteId: number) {
    return await this.produccionService.getTotalMuertesByLote(loteId);
  }
}
