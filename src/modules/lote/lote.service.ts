import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from './entities/lote.entity';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class LoteService {

  constructor(
    @InjectRepository(Lote)
    private readonly loteRepository: Repository<Lote>,
  ) {}

  async findOne(id: number) {
    const lote = await this.loteRepository.findOneBy({ id });
    if (!lote) {
      throw new NotFoundException(`El lote con ID ${id} no existe`);
    }
    return lote;
  }

  async create(createLoteDto: CreateLoteDto) {
    try {
      const lote = this.loteRepository.create(createLoteDto);
      return await this.loteRepository.save(lote);
    } catch (error) {
      throw new BadRequestException('Error al crear el lote en la base de datos');
    }
  }

  async remove(id: number) {
    const lote = await this.findOne(id);
    await this.loteRepository.remove(lote);
    return { message: `El lote con ID ${id} ha sido eliminado correctamente` };
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.loteRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async update(id: number, updateLoteDto: UpdateLoteDto) {
    const lote = await this.loteRepository.preload({
      id: id,
      ...updateLoteDto,
    });
    if (!lote) {
      throw new NotFoundException(`No se encontró el lote con ID ${id} para actualizar`);
    }
    try {
      return await this.loteRepository.save(lote);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el lote en la base de datos');
    }
  }
}
