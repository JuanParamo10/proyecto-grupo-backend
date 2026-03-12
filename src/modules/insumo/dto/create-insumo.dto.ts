import { IsString, IsInt, IsPositive, IsOptional, MinLength, IsNumber } from 'class-validator';

export class CreateInsumoDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsInt()
  @IsPositive()
  tipo_insumo_id: number;

  @IsInt()
  @IsPositive()
  unidad_medida_id: number;

  @IsNumber()
  @IsOptional()
  stock_actual?: number;
}
