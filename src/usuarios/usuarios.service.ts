import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Crear un nuevo usuario (Cambiamos el 'any' por 'Partial<Usuario>')
  async create(createUsuarioDto: Partial<Usuario>): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(nuevoUsuario);
  }

  // Traer todos los usuarios
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  // Buscar un usuario por su ID numérico
  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  // Buscar un usuario por su Username (Slug)
  async findByUsername(username: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { username } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con username '${username}' no encontrado`);
    }
    return usuario;
  }

  // Actualizar un usuario
  async update(id: number, updateUsuarioDto: any): Promise<Usuario> {
    const usuario = await this.findOne(id);
    this.usuarioRepository.merge(usuario, updateUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  // Eliminar un usuario
  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
}