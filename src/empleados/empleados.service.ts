import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    // TypeORM es tan inteligente que solo necesita los IDs para hacer la conexión interna
    const nuevoEmpleado = this.empleadoRepository.create({
      cargo: createEmpleadoDto.cargo,
      usuario: { id: createEmpleadoDto.usuarioId },
      estado: { id: createEmpleadoDto.estadoId },
    });
    return await this.empleadoRepository.save(nuevoEmpleado);
  }

  async findAll(): Promise<Empleado[]> {
    // Esto hace un "JOIN" automático para traerte la información completa
    return await this.empleadoRepository.find({
      relations: ['usuario', 'estado'],
    });
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadoRepository.findOne({
      where: { id },
      relations: ['usuario', 'estado'],
    });
    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: any): Promise<Empleado> {
    const empleado = await this.findOne(id);
    this.empleadoRepository.merge(empleado, updateEmpleadoDto);
    return await this.empleadoRepository.save(empleado);
  }

  async remove(id: number): Promise<void> {
    const empleado = await this.findOne(id);
    await this.empleadoRepository.remove(empleado);
  }
}