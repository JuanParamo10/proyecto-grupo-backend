import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: any) {
    // 🔥 EL ARREGLO: Sacamos el username y el password de la caja y se los damos por separado 🔥
    return this.authService.login(loginDto.username, loginDto.password);
  }
}