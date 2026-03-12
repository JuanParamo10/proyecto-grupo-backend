import { IsString, IsOptional } from 'class-validator';

export class CreateEstadoEntregaDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
