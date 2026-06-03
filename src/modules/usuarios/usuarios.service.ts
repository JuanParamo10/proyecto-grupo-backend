import { Injectable, BadRequestException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Empleado } from '../empleados/entities/empleado.entity'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService implements OnModuleInit {
  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Empleado) private empleadoRepo: Repository<Empleado>
  ) {}

  // 🔥 1. Función que arranca sola al prender el servidor
  async onModuleInit() {
    await this.crearAdminPredeterminado();
  }

  // 🔥 2. Lógica para inyectar el súper usuario y su perfil de empleado
  private async crearAdminPredeterminado() {
    try {
      const adminExiste = await this.findByUsername('admin');

      if (!adminExiste) {
        console.log('⚠️ Usuario admin no encontrado. Creando administrador maestro...');
        
        const hashedPassword = await bcrypt.hash('Yamboro2026*', 10);

        // Creamos el usuario Admin
        const nuevoAdmin = this.usuarioRepo.create({
          nombre: 'Super',
          apellidos: 'Administrador',
          username: 'admin',
          documento: '0000000000',
          password: hashedPassword,
          email: 'admin@yamboro.edu.co',
          telefono: '0000000000',
          direccion: 'Unidad Avícola',
          activo: true
        });

        const adminGuardado = await this.usuarioRepo.save(nuevoAdmin);

        // Creamos el Empleado asociado a ese Admin (¡Vital para tu sistema!)
        const nuevoEmpleadoAdmin = this.empleadoRepo.create({
          usuarioId: adminGuardado.id,
          cargo: 'Administrador', // Le ponemos cargo superior
          estadoEmpleadoId: 1
        });

        await this.empleadoRepo.save(nuevoEmpleadoAdmin);

        console.log('✅ Usuario Administrador maestro creado con éxito.');
      } else {
        console.log('👍 El usuario admin ya existe. Todo en orden.');
      }
    } catch (error) {
      console.log('❌ Error creando el admin predeterminado:', error);
    }
  }

  // =========================================================
  // 🔥 RESTO DE TUS FUNCIONES (Intactas) 🔥
  // =========================================================

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