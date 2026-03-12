import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Galpon } from './entities/galpon.entity';
import { CreateGalponDto } from './dto/create-galpon.dto';
import { UpdateGalponDto } from './dto/update-galpon.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class GalponService {

  constructor(
    @InjectRepository(Galpon)
    private readonly galponRepository: Repository<Galpon>,
  ) {}

  async findOne(id: number) {
    const galpon = await this.galponRepository.findOneBy({ id });
    if (!galpon) {
      throw new NotFoundException(`El galpón con ID ${id} no existe`);
    }
    return galpon;
  }

  async create(createGalponDto: CreateGalponDto) {
    try {
      const galpon = this.galponRepository.create(createGalponDto);
      return await this.galponRepository.save(galpon);
    } catch (error) {
      throw new BadRequestException('Error al crear el galpón en la base de datos');
    }
  }

  async remove(id: number) {
    const galpon = await this.findOne(id);
    await this.galponRepository.remove(galpon);
    return { message: `El galpón con ID ${id} ha sido eliminado correctamente` };
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.galponRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async update(id: number, updateGalponDto: UpdateGalponDto) {
    const galpon = await this.galponRepository.preload({
      id: id,
      ...updateGalponDto,
    });
    if (!galpon) {
      throw new NotFoundException(`No se encontró el galpón con ID ${id} para actualizar`);
    }
    try {
      return await this.galponRepository.save(galpon);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el galpón en la base de datos');
    }
  }
}
