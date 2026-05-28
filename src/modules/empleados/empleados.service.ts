import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: any) {
    // 🔥 CORREGIDO: Usamos usuarioId y las propiedades exactas 🔥
    const nuevoEmpleado = this.empleadoRepository.create({
      usuarioId: createEmpleadoDto.usuarioId,
      cargo: createEmpleadoDto.cargo || 'Operario',
      estadoEmpleadoId: createEmpleadoDto.estadoEmpleadoId || 1
    });
    return await this.empleadoRepository.save(nuevoEmpleado);
  }

  async findAll() {
    return await this.empleadoRepository.find();
  }

  async findOne(id: number) {
    const empleado = await this.empleadoRepository.findOne({ where: { id } });
    if (!empleado) {
      throw new NotFoundException(`Empleado #${id} no encontrado`);
    }
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: any) {
    const empleado = await this.empleadoRepository.preload({
      id,
      ...updateEmpleadoDto,
    });
    if (!empleado) {
      throw new NotFoundException(`Empleado #${id} no encontrado`);
    }
    return await this.empleadoRepository.save(empleado);
  }

  async remove(id: number) {
    const empleado = await this.findOne(id);
    return await this.empleadoRepository.remove(empleado);
  }
}