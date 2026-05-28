import { IsString, IsOptional, IsEmail, IsBoolean, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre!: string;

  @IsString()
  apellidos!: string;

  @IsString()
  username!: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @IsEmail({}, { message: 'El formato del correo no es válido' })
  email!: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsString()
  documento!: string;

  @IsString()
  telefono!: string;

  @IsString()
  direccion!: string;

  // 🔥 NUEVO: Dejamos pasar el paquete JSON de los permisos 🔥
  @IsOptional()
  permisos?: any;
}