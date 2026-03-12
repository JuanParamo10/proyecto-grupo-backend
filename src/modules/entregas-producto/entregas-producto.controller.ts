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
import { EntregasProductoService } from './entregas-producto.service';
import { CreateEstadoEntregaDto } from './dto/create-estado-entrega.dto';
import { CreateDestinatarioDto } from './dto/create-destinatario.dto';
import { CreateEntregaProductoDto } from './dto/create-entrega-producto.dto';
import { UpdateEntregaProductoDto } from './dto/update-entrega-producto.dto';

@Controller('entregas-producto')
export class EntregasProductoController {
  constructor(private readonly entregasProductoService: EntregasProductoService) {}

  // ==================== ESTADO ENTREGA ====================
  @Post('estado-entrega')
  async createEstadoEntrega(@Body() createDto: CreateEstadoEntregaDto) {
    return await this.entregasProductoService.createEstadoEntrega(createDto);
  }

  @Get('estado-entrega')
  async findAllEstadoEntrega() {
    return await this.entregasProductoService.findAllEstadoEntrega();
  }

  @Get('estado-entrega/:id')
  async findOneEstadoEntrega(@Param('id', ParseIntPipe) id: number) {
    return await this.entregasProductoService.findOneEstadoEntrega(id);
  }

  @Put('estado-entrega/:id')
  async updateEstadoEntrega(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<CreateEstadoEntregaDto>,
  ) {
    return await this.entregasProductoService.updateEstadoEntrega(id, updateDto);
  }

  @Delete('estado-entrega/:id')
  async removeEstadoEntrega(@Param('id', ParseIntPipe) id: number) {
    return await this.entregasProductoService.removeEstadoEntrega(id);
  }

  // ==================== DESTINATARIO ====================
  @Post('destinatario')
  async createDestinatario(@Body() createDto: CreateDestinatarioDto) {
    return await this.entregasProductoService.createDestinatario(createDto);
  }

  @Get('destinatario')
  async findAllDestinatario() {
    return await this.entregasProductoService.findAllDestinatario();
  }

  @Get('destinatario/:id')
  async findOneDestinatario(@Param('id', ParseIntPipe) id: number) {
    return await this.entregasProductoService.findOneDestinatario(id);
  }

  @Put('destinatario/:id')
  async updateDestinatario(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<CreateDestinatarioDto>,
  ) {
    return await this.entregasProductoService.updateDestinatario(id, updateDto);
  }

  @Delete('destinatario/:id')
  async removeDestinatario(@Param('id', ParseIntPipe) id: number) {
    return await this.entregasProductoService.removeDestinatario(id);
  }

  // ==================== ENTREGA PRODUCTO ====================
  @Post()
  async createEntregaProducto(@Body() createDto: CreateEntregaProductoDto) {
    return await this.entregasProductoService.createEntregaProducto(createDto);
  }

  @Get()
  async findAllEntregaProducto() {
    return await this.entregasProductoService.findAllEntregaProducto();
  }

  @Get(':id')
  async findOneEntregaProducto(@Param('id', ParseIntPipe) id: number) {
    return await this.entregasProductoService.findOneEntregaProducto(id);
  }

  @Put(':id')
  async updateEntregaProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEntregaProductoDto,
  ) {
    return await this.entregasProductoService.updateEntregaProducto(id, updateDto);
  }

  @Delete(':id')
  async removeEntregaProducto(@Param('id', ParseIntPipe) id: number) {
    return await this.entregasProductoService.removeEntregaProducto(id);
  }

  @Get('buscar/remision/:numeroRemision')
  async findEntregaProductoByRemision(
    @Param('numeroRemision') numeroRemision: string,
  ) {
    return await this.entregasProductoService.findEntregaProductoByRemision(
      numeroRemision,
    );
  }
}
