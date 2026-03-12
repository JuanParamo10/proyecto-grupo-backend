import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module'; 
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: 'MI_PALABRA_SECRETA_SUPER_SEGURA', // Llave maestra
      signOptions: { expiresIn: '8h' }, // El token dura 8 horas
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}