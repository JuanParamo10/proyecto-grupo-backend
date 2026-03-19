import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateTipoInsumoDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
