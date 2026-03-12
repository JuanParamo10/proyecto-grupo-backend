import { IsString, IsNotEmpty, IsInt, IsOptional, MaxLength } from 'class-validator';

export class CreateEmpleadoDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  cargo?: string;

  @IsInt()
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  usuarioId: number;

  @IsInt()
  @IsNotEmpty({ message: 'El ID del estado del empleado es obligatorio' })
  estadoId: number;
}