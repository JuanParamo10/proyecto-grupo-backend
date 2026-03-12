import { IsDateString, IsOptional, IsNumber, IsString } from 'class-validator';

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
}
