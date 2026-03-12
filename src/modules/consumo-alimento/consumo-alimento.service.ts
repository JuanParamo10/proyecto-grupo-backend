import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsumoAlimento } from './entities/consumo-alimento.entity';
import { CreateConsumoAlimentoDto } from './dto/create-consumo-alimento.dto';
import { UpdateConsumoAlimentoDto } from './dto/update-consumo-alimento.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ConsumoAlimentoService {

  constructor(
    @InjectRepository(ConsumoAlimento)
    private readonly consumoAlimentoRepository: Repository<ConsumoAlimento>,
  ) {}

  async findOne(id: number) {
    const consumo = await this.consumoAlimentoRepository.findOneBy({ id });
    if (!consumo) {
      throw new NotFoundException(`El consumo de alimento con ID ${id} no existe`);
    }
    return consumo;
  }

  async create(createConsumoAlimentoDto: CreateConsumoAlimentoDto) {
    try {
      const consumo = this.consumoAlimentoRepository.create(createConsumoAlimentoDto);
      return await this.consumoAlimentoRepository.save(consumo);
    } catch (error) {
      throw new BadRequestException('Error al crear el consumo de alimento en la base de datos');
    }
  }

  async remove(id: number) {
    const consumo = await this.findOne(id);
    await this.consumoAlimentoRepository.remove(consumo);
    return { message: `El consumo de alimento con ID ${id} ha sido eliminado correctamente` };
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.consumoAlimentoRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async update(id: number, updateConsumoAlimentoDto: UpdateConsumoAlimentoDto) {
    const consumo = await this.consumoAlimentoRepository.preload({
      id: id,
      ...updateConsumoAlimentoDto,
    });
    if (!consumo) {
      throw new NotFoundException(`No se encontró el consumo de alimento con ID ${id} para actualizar`);
    }
    try {
      return await this.consumoAlimentoRepository.save(consumo);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el consumo de alimento en la base de datos');
    }
  }
}
