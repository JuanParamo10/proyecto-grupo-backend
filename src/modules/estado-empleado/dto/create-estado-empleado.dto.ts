import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateEstadoEmpleadoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del estado es obligatorio (ej: Activo, Vacaciones)' })
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  descripcion?: string;
}