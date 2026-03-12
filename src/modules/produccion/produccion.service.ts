import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ProduccionDiaria } from './entities/produccion-diaria.entity';
import { Muerte } from './entities/muerte.entity';
import { CreateProduccionDiariaDto } from './dto/create-produccion-diaria.dto';
import { CreateMuerteDto } from './dto/create-muerte.dto';
import { UpdateProduccionDiariaDto, UpdateMuerteDto } from './dto/update-produccion.dto';

@Injectable()
export class ProduccionService {
  constructor(
    @InjectRepository(ProduccionDiaria)
    private readonly produccionDiariaRepository: Repository<ProduccionDiaria>,
    @InjectRepository(Muerte)
    private readonly muerteRepository: Repository<Muerte>,
  ) {}

  // ==================== PRODUCCIÓN DIARIA ====================
  async createProduccionDiaria(createDto: CreateProduccionDiariaDto) {
    const produccion = this.produccionDiariaRepository.create({
      ...createDto,
      fecha: createDto.fecha ? new Date(createDto.fecha) : new Date(),
    });
    return await this.produccionDiariaRepository.save(produccion);
  }

  async findAllProduccionDiaria() {
    return await this.produccionDiariaRepository.find({
      order: { fecha: 'DESC' },
    });
  }

  async findOneProduccionDiaria(id: number) {
    const produccion = await this.produccionDiariaRepository.findOne({
      where: { id },
    });
    if (!produccion) {
      throw new NotFoundException(`Producción diaria con ID ${id} no encontrada`);
    }
    return produccion;
  }

  async updateProduccionDiaria(id: number, updateDto: UpdateProduccionDiariaDto) {
    const produccion = await this.produccionDiariaRepository.preload({
      id,
      ...updateDto,
    });
    if (!produccion) {
      throw new NotFoundException(`Producción diaria con ID ${id} no encontrada`);
    }
    return await this.produccionDiariaRepository.save(produccion);
  }

  async removeProduccionDiaria(id: number) {
    const produccion = await this.produccionDiariaRepository.findOne({ where: { id } });
    if (!produccion) {
      throw new NotFoundException(`Producción diaria con ID ${id} no encontrada`);
    }
    await this.produccionDiariaRepository.remove(produccion);
    return { message: `Producción diaria con ID ${id} eliminada` };
  }

  async findProduccionByLote(loteId: number) {
    return await this.produccionDiariaRepository.find({
      where: { loteId },
      order: { fecha: 'DESC' },
    });
  }

  async findProduccionByFecha(fechaInicio: string, fechaFin: string) {
    return await this.produccionDiariaRepository.find({
      where: {
        fecha: Between(new Date(fechaInicio), new Date(fechaFin)),
      },
      order: { fecha: 'DESC' },
    });
  }

  // ==================== MUERTE ====================
  async createMuerte(createDto: CreateMuerteDto) {
    const muerte = this.muerteRepository.create({
      ...createDto,
      fecha: createDto.fecha ? new Date(createDto.fecha) : new Date(),
    });
    return await this.muerteRepository.save(muerte);
  }

  async findAllMuerte() {
    return await this.muerteRepository.find({
      order: { fecha: 'DESC' },
    });
  }

  async findOneMuerte(id: number) {
    const muerte = await this.muerteRepository.findOne({
      where: { id },
    });
    if (!muerte) {
      throw new NotFoundException(`Registro de muerte con ID ${id} no encontrado`);
    }
    return muerte;
  }

  async updateMuerte(id: number, updateDto: UpdateMuerteDto) {
    const muerte = await this.muerteRepository.preload({
      id,
      ...updateDto,
    });
    if (!muerte) {
      throw new NotFoundException(`Registro de muerte con ID ${id} no encontrado`);
    }
    return await this.muerteRepository.save(muerte);
  }

  async removeMuerte(id: number) {
    const muerte = await this.findOneMuerte(id);
    await this.muerteRepository.remove(muerte);
    return { message: `Registro de muerte con ID ${id} eliminado` };
  }

  async findMuerteByLote(loteId: number) {
    return await this.muerteRepository.find({
      where: { loteId },
      order: { fecha: 'DESC' },
    });
  }

  async findMuerteByFecha(fechaInicio: string, fechaFin: string) {
    return await this.muerteRepository.find({
      where: {
        fecha: Between(new Date(fechaInicio), new Date(fechaFin)),
      },
      order: { fecha: 'DESC' },
    });
  }

  async getTotalMuertesByLote(loteId: number) {
    const result = await this.muerteRepository
      .createQueryBuilder('muerte')
      .select('SUM(muerte.cantidad)', 'total')
      .where('muerte.loteId = :loteId', { loteId })
      .getRawOne();
    return result?.total || 0;
  }
}
