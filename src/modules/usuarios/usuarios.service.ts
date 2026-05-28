import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Empleado } from '../empleados/entities/empleado.entity'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Empleado) private empleadoRepo: Repository<Empleado>
  ) {}

  async create(data: any) {
    try {
      // 1. Encriptamos la contraseña
      const passwordLimpia = data.password ? String(data.password) : '12345678';
      const hashedPassword = await bcrypt.hash(passwordLimpia, 10);

      // 2. Creamos el usuario
      const nuevoUsuario = this.usuarioRepo.create({
        nombre: data.nombre || data.nombres,
        apellidos: data.apellidos,
        username: data.documento || data.username,
        password: hashedPassword,
        email: data.email,
        documento: data.documento,
        telefono: data.telefono,
        direccion: data.direccion,
        activo: true
      });

      const usuarioGuardado = await this.usuarioRepo.save(nuevoUsuario);

      // 3. Creamos el empleado amarrado
      const nuevoEmpleado = this.empleadoRepo.create({
        usuarioId: usuarioGuardado.id,
        cargo: 'Operario',
        estadoEmpleadoId: 1
      });

      const empleadoGuardado = await this.empleadoRepo.save(nuevoEmpleado);

      return { ...usuarioGuardado, empleadoId: empleadoGuardado.id };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error interno al crear usuario y empleado.');
    }
  }

  async findAll() {
    return await this.usuarioRepo.find();
  }

  // 🔥 FUNCIONES VITALES PARA EL LOGIN Y CONTROLADOR 🔥
  async findOne(id: number) {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException(`Usuario #${id} no encontrado`);
    return usuario;
  }

  async findByUsername(username: string) {
    return await this.usuarioRepo.findOne({ where: { username } });
  }

  async update(id: number, data: any) {
    const usuario = await this.usuarioRepo.preload({ id, ...data });
    if (!usuario) throw new NotFoundException(`Usuario #${id} no encontrado`);
    return await this.usuarioRepo.save(usuario);
  }

  async remove(id: number) {
    const user = await this.usuarioRepo.findOne({ where: { id } });
    if (user) {
      await this.usuarioRepo.remove(user);
    }
    return { message: 'Usuario eliminado' };
  }
}