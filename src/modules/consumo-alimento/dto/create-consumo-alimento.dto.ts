import { IsInt, IsPositive, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateConsumoAlimentoDto {
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsInt()
  @IsPositive()
  lote_id: number;

  @IsInt()
  @IsPositive()
  insumo_id: number;

  @IsNumber()
  @IsPositive()
  cantidad_kilos: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  empleado_id?: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
