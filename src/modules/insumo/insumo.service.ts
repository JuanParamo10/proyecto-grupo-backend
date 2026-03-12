import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insumo } from './entities/insumo.entity';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class InsumoService {

  constructor(
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>,
  ) {}

  async findOne(id: number) {
    const insumo = await this.insumoRepository.findOneBy({ id });
    if (!insumo) {
      throw new NotFoundException(`El insumo con ID ${id} no existe`);
    }
    return insumo;
  }

  async create(createInsumoDto: CreateInsumoDto) {
    try {
      const insumo = this.insumoRepository.create(createInsumoDto);
      return await this.insumoRepository.save(insumo);
    } catch (error) {
      throw new BadRequestException('Error al crear el insumo en la base de datos');
    }
  }

  async remove(id: number) {
    const insumo = await this.findOne(id);
    await this.insumoRepository.remove(insumo);
    return { message: `El insumo con ID ${id} ha sido eliminado correctamente` };
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.insumoRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async update(id: number, updateInsumoDto: UpdateInsumoDto) {
    const insumo = await this.insumoRepository.preload({
      id: id,
      ...updateInsumoDto,
    });
    if (!insumo) {
      throw new NotFoundException(`No se encontró el insumo con ID ${id} para actualizar`);
    }
    try {
      return await this.insumoRepository.save(insumo);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el insumo en la base de datos');
    }
  }
}
