import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoInsumo } from './entities/tipo-insumo.entity';
import { CreateTipoInsumoDto } from './dto/create-tipo-insumo.dto';
import { UpdateTipoInsumoDto } from './dto/update-tipo-insumo.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class TipoInsumoService {

  constructor(
    @InjectRepository(TipoInsumo)
    private readonly tipoInsumoRepository: Repository<TipoInsumo>,
  ) {}

  async findOne(id: number) {
    const tipo = await this.tipoInsumoRepository.findOneBy({ id });
    if (!tipo) {
      throw new NotFoundException(`El tipo de insumo con ID ${id} no existe`);
    }
    return tipo;
  }

  async create(createTipoInsumoDto: CreateTipoInsumoDto) {
    try {
      const tipo = this.tipoInsumoRepository.create(createTipoInsumoDto);
      return await this.tipoInsumoRepository.save(tipo);
    } catch (error) {
      throw new BadRequestException('Error al crear el tipo de insumo en la base de datos');
    }
  }

  async remove(id: number) {
    const tipo = await this.findOne(id);
    await this.tipoInsumoRepository.remove(tipo);
    return { message: `El tipo de insumo con ID ${id} ha sido eliminado correctamente` };
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.tipoInsumoRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async update(id: number, updateTipoInsumoDto: UpdateTipoInsumoDto) {
    const tipo = await this.tipoInsumoRepository.preload({
      id: id,
      ...updateTipoInsumoDto,
    });
    if (!tipo) {
      throw new NotFoundException(`No se encontró el tipo de insumo con ID ${id} para actualizar`);
    }
    try {
      return await this.tipoInsumoRepository.save(tipo);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el tipo de insumo en la base de datos');
    }
  }
}
