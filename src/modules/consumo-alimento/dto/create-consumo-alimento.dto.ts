import { IsInt, IsPositive, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateConsumoAlimentoDto {
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsInt()
  @IsPositive()
  lote_id!: number; // Le pusimos el '!' para que no moleste

  // 🔥 AQUÍ ARREGLAMOS AL GUARDIA PARA QUE ACEPTE EL UUID (LETRAS) 🔥
  @IsString()
  insumo_id!: string; // Le pusimos el '!' y lo cambiamos a string

  @IsNumber()
  @IsPositive()
  cantidad_kilos!: number; // Le pusimos el '!'

  @IsInt()
  @IsPositive()
  @IsOptional()
  empleado_id?: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}