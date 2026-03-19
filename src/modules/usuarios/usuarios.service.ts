import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt'; // <-- 1. Importamos la librería de encriptación

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // 2. Definimos el nivel de seguridad de la encriptación (10 es el estándar)
    const saltRounds = 10;

    // 3. Transformamos la contraseña de texto plano a texto encriptado
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, saltRounds);

    // 4. Armamos el usuario usando los datos del DTO, pero reemplazando el password
    const nuevoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      password: hashedPassword, // Guardamos la versión encriptada
    });

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async findByUsername(username: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { username } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con username '${username}' no encontrado`);
    }
    return usuario;
  }

  async update(id: number, updateUsuarioDto: any): Promise<Usuario> {
    const usuario = await this.findOne(id);
    this.usuarioRepository.merge(usuario, updateUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
}