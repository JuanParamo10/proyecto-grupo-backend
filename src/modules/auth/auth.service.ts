import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async login(username: string, pass: string) {
    // 1. Buscamos al usuario en la BD
    const usuario = await this.usuariosService.findByUsername(username);

    // Si no existe, lo rebotamos
    if (!usuario) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // 2. Comparamos las contraseñas
    const isPasswordValid = await bcrypt.compare(pass, usuario.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // 3. Generamos el Token de acceso
    const payload = { sub: usuario.id, username: usuario.username };

    // 4. Retornamos el token y TODOS los datos útiles, incluyendo permisos
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: usuario.id,
        username: usuario.username,
        nombre: usuario.nombre,
        // 🔥 AQUÍ ENVIAMOS LOS PERMISOS AL FRONTEND 🔥
        permisos: usuario.permisos 
      }
    };
  }
}