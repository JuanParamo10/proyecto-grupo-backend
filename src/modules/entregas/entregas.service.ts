import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Entrega } from './entities/entregas.entity';
import { CreateEntregaDto } from './dto/create-entregas.dto';
import { UpdateEntregaDto } from './dto/update-entregas.dto';
import { PaginationDto } from './dto/pagination.dto';
import { InsumosService } from '../insumos/insumos.service';

@Injectable()
export class EntregasService {

  constructor(
    @InjectRepository(Entrega)
    private readonly entregaRepository: Repository<Entrega>,

    private readonly insumosService: InsumosService,
  ) {}

  async create(createEntregaDto: CreateEntregaDto) {
    const { insumoId, cantidad, ...datosRestantes } = createEntregaDto;

    try {
      const insumo = await this.insumosService.findOne(insumoId);

      if (insumo.tipo !== 'PRODUCTO') {
        throw new BadRequestException(
          `El artículo "${insumo.nombre}" es un INSUMO interno. Solo se pueden realizar entregas de PRODUCTOS finales.`
        );
      }

      if (insumo.stock < cantidad) {
        throw new BadRequestException(
          `No hay suficiente stock. Disponible: ${insumo.stock}, Solicitado: ${cantidad}`
        );
      }

      const entrega = this.entregaRepository.create({
        ...datosRestantes,
        cantidad,
        insumo, 
      });

      await this.insumosService.update(insumoId, { 
        stock: insumo.stock - cantidad 
      });

      return await this.entregaRepository.save(entrega);

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al procesar la entrega en la Unidad Yamboró');
    }
  }

  async findOne(id: number) {
    const entrega = await this.entregaRepository.findOne({ 
      where: { id },
      relations: ['insumo'] 
    });

    if (!entrega) {
      throw new NotFoundException(`La entrega con ID ${id} no existe`);
    }

    return entrega;
  }

  async remove(id: number) {
    const entrega = await this.findOne(id);
    
    await this.insumosService.update(entrega.insumo.id, {
      stock: entrega.insumo.stock + entrega.cantidad
    });

    await this.entregaRepository.remove(entrega);
    
    return { message: `La entrega con ID ${id} ha sido eliminada y el stock fue devuelto.` };
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.entregaRepository.find({
      take: limit,  
      skip: offset,
      relations: ['insumo'],
      
      order: {
      fechaCreacion: 'DESC'
    }
    });
  }

  async update(id: number, updateEntregaDto: UpdateEntregaDto) {
    try {
      const entrega = await this.entregaRepository.preload({
        id: id,
        ...updateEntregaDto,
      });

      if (!entrega) throw new NotFoundException(`Entrega con id ${id} no encontrada`);

      return await this.entregaRepository.save(entrega);
    } catch (error) {
      throw new BadRequestException('No se pudo actualizar la entrega. Verifica los datos.');
    }
  }

  async findToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0); 

  const end = new Date();
  end.setHours(23, 59, 59, 999); 

  return await this.entregaRepository.find({
    where: {
      fechaCreacion: Between(start, end)
    },
    relations: ['insumo'],
    order: { fechaCreacion: 'DESC' }
  });
}
}