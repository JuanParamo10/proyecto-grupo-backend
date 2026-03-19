import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoEmpleado } from './entities/estado-empleado.entity';
import { CreateEstadoEmpleadoDto } from './dto/create-estado-empleado.dto';

@Injectable()
export class EstadoEmpleadoService {
  constructor(
    @InjectRepository(EstadoEmpleado)
    private readonly estadoEmpleadoRepository: Repository<EstadoEmpleado>,
  ) {}

  async create(createEstadoEmpleadoDto: CreateEstadoEmpleadoDto): Promise<EstadoEmpleado> {
    const nuevoEstado = this.estadoEmpleadoRepository.create(createEstadoEmpleadoDto);
    return await this.estadoEmpleadoRepository.save(nuevoEstado);
  }

  async findAll(): Promise<EstadoEmpleado[]> {
    return await this.estadoEmpleadoRepository.find();
  }

  async findOne(id: number): Promise<EstadoEmpleado> {
    const estado = await this.estadoEmpleadoRepository.findOne({ where: { id } });
    if (!estado) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }
    return estado;
  }

  async update(id: number, updateEstadoEmpleadoDto: any): Promise<EstadoEmpleado> {
    const estado = await this.findOne(id);
    this.estadoEmpleadoRepository.merge(estado, updateEstadoEmpleadoDto);
    return await this.estadoEmpleadoRepository.save(estado);
  }

  async remove(id: number): Promise<void> {
    const estado = await this.findOne(id);
    await this.estadoEmpleadoRepository.remove(estado);
  }
}