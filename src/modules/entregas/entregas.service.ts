import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entrega } from './entities/entregas.entity';
import { CreateEntregaDto } from './dto/create-entregas.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateEntregaDto } from './dto/update-entregas.dto';
import { PaginationDto } from './dto/pagination.dto';
@Injectable()
export class EntregasService {

  constructor(
    @InjectRepository(Entrega)
    private readonly entregaRepository: Repository<Entrega>,
  ) {}

  async findOne(id: number) {
    const entrega = await this.entregaRepository.findOneBy({ id });

    if (!entrega) {
      throw new NotFoundException(`La entrega con ID ${id} no existe`);
    }

    return entrega;
  }

  async create(createEntregaDto: CreateEntregaDto) {
    try {
      const entrega = this.entregaRepository.create(createEntregaDto);
      return await this.entregaRepository.save(entrega);
    } catch (error) {
      throw new BadRequestException('Error al crear la entrega en la base de datos');
    }
  }

  async remove(id: number) {
    const entrega = await this.findOne(id);
    
    await this.entregaRepository.remove(entrega);
    
    return { message: `La entrega con ID ${id} ha sido eliminada correctamente` };
  }

  async findAll(paginationDto: PaginationDto) {
  const { limit = 10, offset = 0 } = paginationDto;

  return await this.entregaRepository.find({
    take: limit,  
    skip: offset,  
  });
}

  async update(id: number, updateEntregaDto: UpdateEntregaDto) {
    const entrega = await this.entregaRepository.preload({
      id: id,
      ...updateEntregaDto,
    });

    if (!entrega) {
      throw new NotFoundException(`No se encontró la entrega con ID ${id} para actualizar`);
    }

    try {
      return await this.entregaRepository.save(entrega);
    } catch (error) {
      throw new Error('Error al actualizar la entrega en la base de datos');
    }
  }

  
}