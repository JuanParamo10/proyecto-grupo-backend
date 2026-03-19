import { IsString, IsInt, IsPositive, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class CreateLoteDto {
  @IsString()
  codigo: string;

  @IsInt()
  @IsPositive()
  galpon_id: number;

  @IsInt()
  @IsPositive()
  cantidad_inicial: number;

  @IsDateString()
  @IsOptional()
  fecha_ingreso?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
