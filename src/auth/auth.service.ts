import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // 1. Buscamos al usuario por su username
    const usuario = await this.usuariosService.findByUsername(username);

    // 2. Comparamos la contraseña enviada con la que está en la base de datos (encriptada)
    const isPasswordValid = await bcrypt.compare(password, usuario.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    // 3. Si todo está bien, generamos el Token
    const payload = { sub: usuario.id, username: usuario.username };

   // ... (lo que ya tienes arriba)
    return {
      usuario: {
        id: usuario.id,
        username: usuario.username,
        nombre: usuario.nombre,
      },
      token: this.jwtService.sign(payload),
    };
  } // Cierre del método login
} // Cierre de la clase AuthService