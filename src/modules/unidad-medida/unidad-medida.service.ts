import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadMedida } from './entities/unidad-medida.entity';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class UnidadMedidaService {

  constructor(
    @InjectRepository(UnidadMedida)
    private readonly unidadMedidaRepository: Repository<UnidadMedida>,
  ) {}

  async findOne(id: number) {
    const unidad = await this.unidadMedidaRepository.findOneBy({ id });
    if (!unidad) {
      throw new NotFoundException(`La unidad de medida con ID ${id} no existe`);
    }
    return unidad;
  }

  async create(createUnidadMedidaDto: CreateUnidadMedidaDto) {
    try {
      const unidad = this.unidadMedidaRepository.create(createUnidadMedidaDto);
      return await this.unidadMedidaRepository.save(unidad);
    } catch (error) {
      throw new BadRequestException('Error al crear la unidad de medida en la base de datos');
    }
  }

  async remove(id: number) {
    const unidad = await this.findOne(id);
    await this.unidadMedidaRepository.remove(unidad);
    return { message: `La unidad de medida con ID ${id} ha sido eliminada correctamente` };
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.unidadMedidaRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async update(id: number, updateUnidadMedidaDto: UpdateUnidadMedidaDto) {
    const unidad = await this.unidadMedidaRepository.preload({
      id: id,
      ...updateUnidadMedidaDto,
    });
    if (!unidad) {
      throw new NotFoundException(`No se encontró la unidad de medida con ID ${id} para actualizar`);
    }
    try {
      return await this.unidadMedidaRepository.save(unidad);
    } catch (error) {
      throw new BadRequestException('Error al actualizar la unidad de medida en la base de datos');
    }
  }
}
