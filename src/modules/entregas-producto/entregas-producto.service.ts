import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoEntrega } from './entities/estado-entrega.entity';
import { Destinatario } from './entities/destinatario.entity';
import { EntregaProducto } from './entities/entrega-producto.entity';
import { EntregaDetalle } from './entities/entrega-detalle.entity';
import { CreateEstadoEntregaDto } from './dto/create-estado-entrega.dto';
import { CreateDestinatarioDto } from './dto/create-destinatario.dto';
import { CreateEntregaProductoDto } from './dto/create-entrega-producto.dto';
import { UpdateEntregaProductoDto } from './dto/update-entrega-producto.dto';

@Injectable()
export class EntregasProductoService {
  constructor(
    @InjectRepository(EstadoEntrega)
    private readonly estadoEntregaRepository: Repository<EstadoEntrega>,
    @InjectRepository(Destinatario)
    private readonly destinatarioRepository: Repository<Destinatario>,
    @InjectRepository(EntregaProducto)
    private readonly entregaProductoRepository: Repository<EntregaProducto>,
    @InjectRepository(EntregaDetalle)
    private readonly entregaDetalleRepository: Repository<EntregaDetalle>,
  ) {}

  // ==================== ESTADO ENTREGA ====================
  async createEstadoEntrega(createDto: CreateEstadoEntregaDto) {
    const estadoEntrega = this.estadoEntregaRepository.create(createDto);
    return await this.estadoEntregaRepository.save(estadoEntrega);
  }

  async findAllEstadoEntrega() {
    return await this.estadoEntregaRepository.find();
  }

  async findOneEstadoEntrega(id: number) {
    const estado = await this.estadoEntregaRepository.findOne({ where: { id } });
    if (!estado) {
      throw new NotFoundException(`Estado de entrega con ID ${id} no encontrado`);
    }
    return estado;
  }

  async updateEstadoEntrega(id: number, updateDto: Partial<CreateEstadoEntregaDto>) {
    const estado = await this.findOneEstadoEntrega(id);
    Object.assign(estado, updateDto);
    return await this.estadoEntregaRepository.save(estado);
  }

  async removeEstadoEntrega(id: number) {
    const estado = await this.findOneEstadoEntrega(id);
    await this.estadoEntregaRepository.remove(estado);
    return { message: `Estado de entrega con ID ${id} eliminado` };
  }

  // ==================== DESTINATARIO ====================
  async createDestinatario(createDto: CreateDestinatarioDto) {
    const destinatario = this.destinatarioRepository.create(createDto);
    return await this.destinatarioRepository.save(destinatario);
  }

  async findAllDestinatario() {
    return await this.destinatarioRepository.find();
  }

  async findOneDestinatario(id: number) {
    const destinatario = await this.destinatarioRepository.findOne({ where: { id } });
    if (!destinatario) {
      throw new NotFoundException(`Destinatario con ID ${id} no encontrado`);
    }
    return destinatario;
  }

  async updateDestinatario(id: number, updateDto: Partial<CreateDestinatarioDto>) {
    const destinatario = await this.findOneDestinatario(id);
    Object.assign(destinatario, updateDto);
    return await this.destinatarioRepository.save(destinatario);
  }

  async removeDestinatario(id: number) {
    const destinatario = await this.findOneDestinatario(id);
    await this.destinatarioRepository.remove(destinatario);
    return { message: `Destinatario con ID ${id} eliminado` };
  }

  // ==================== ENTREGA PRODUCTO ====================
  async createEntregaProducto(createDto: CreateEntregaProductoDto) {
    const { destinatarioId, estadoEntregaId, detalles, ...datosEntrega } = createDto;

    let destinatario: Destinatario | undefined;
    let estadoEntrega: EstadoEntrega | undefined;

    if (destinatarioId) {
      destinatario = await this.findOneDestinatario(destinatarioId);
    }

    if (estadoEntregaId) {
      estadoEntrega = await this.findOneEstadoEntrega(estadoEntregaId);
    }

    const entregaProducto = this.entregaProductoRepository.create({
      ...datosEntrega,
      destinatario,
      estadoEntrega,
    });

    const savedEntrega = await this.entregaProductoRepository.save(entregaProducto);

    if (detalles && detalles.length > 0) {
      for (const detalle of detalles) {
        const entregaDetalle = this.entregaDetalleRepository.create({
          ...detalle,
          entrega: savedEntrega,
        });
        await this.entregaDetalleRepository.save(entregaDetalle);
      }
    }

    return this.findOneEntregaProducto(savedEntrega.id);
  }

  async findAllEntregaProducto() {
    return await this.entregaProductoRepository.find({
      relations: ['destinatario', 'estadoEntrega', 'detalles'],
      order: { fecha: 'DESC' },
    });
  }

  async findOneEntregaProducto(id: number) {
    const entrega = await this.entregaProductoRepository.findOne({
      where: { id },
      relations: ['destinatario', 'estadoEntrega', 'detalles'],
    });
    if (!entrega) {
      throw new NotFoundException(`Entrega de producto con ID ${id} no encontrada`);
    }
    return entrega;
  }

  async updateEntregaProducto(id: number, updateDto: UpdateEntregaProductoDto) {
    const entrega = await this.entregaProductoRepository.preload({
      id,
      ...updateDto,
    });

    if (!entrega) {
      throw new NotFoundException(`Entrega de producto con ID ${id} no encontrada`);
    }

    return await this.entregaProductoRepository.save(entrega);
  }

  async removeEntregaProducto(id: number) {
    const entrega = await this.findOneEntregaProducto(id);
    await this.entregaProductoRepository.remove(entrega);
    return { message: `Entrega de producto con ID ${id} eliminada` };
  }

  async findEntregaProductoByRemision(numeroRemision: string) {
    const entrega = await this.entregaProductoRepository.findOne({
      where: { numeroRemision },
      relations: ['destinatario', 'estadoEntrega', 'detalles'],
    });
    if (!entrega) {
      throw new NotFoundException(`Entrega con número de remisión "${numeroRemision}" no encontrada`);
    }
    return entrega;
  }
}
