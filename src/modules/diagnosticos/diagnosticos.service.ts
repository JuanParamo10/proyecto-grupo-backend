import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diagnostico } from './entities/diagnostico.entity';
import { CreateDiagnosticoDto } from './dto/create-diagnostico.dto';

@Injectable()
export class DiagnosticosService {
  constructor(
    @InjectRepository(Diagnostico)
    private readonly diagnosticoRepository: Repository<Diagnostico>,
  ) {}

  async create(createDto: CreateDiagnosticoDto) {
    const nuevo = this.diagnosticoRepository.create(createDto);
    return await this.diagnosticoRepository.save(nuevo);
  }

  async findAll() {
    return await this.diagnosticoRepository.find();
  }

  async update(id: number, updateDto: any) {
    const registro = await this.diagnosticoRepository.preload({ id, ...updateDto });
    if (!registro) throw new NotFoundException(`Diagnóstico #${id} no encontrado`);
    return await this.diagnosticoRepository.save(registro);
  }

  async remove(id: number) {
    const registro = await this.diagnosticoRepository.findOne({ where: { id } });
    if (!registro) throw new NotFoundException(`Diagnóstico #${id} no encontrado`);
    return await this.diagnosticoRepository.remove(registro);
  }
}