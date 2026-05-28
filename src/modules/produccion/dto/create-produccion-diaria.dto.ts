import { IsDateString, IsOptional, IsNumber, IsString, IsInt, Min } from 'class-validator';

export class CreateProduccionDiariaDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsNumber()
  loteId?: number;

  @IsOptional()
  @IsNumber()
  cantidadTotal?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;

  // 🔥 NUEVOS CAMPOS DEL DISEÑO DE FIGMA 🔥
  @IsOptional()
  @IsInt()
  @Min(0)
  jumbo?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  aaa?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  aa?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  a?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  b?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  c?: number;

  @IsOptional()
  @IsString()
  turno?: string;

  @IsOptional()
  @IsString()
  encargado?: string;
}