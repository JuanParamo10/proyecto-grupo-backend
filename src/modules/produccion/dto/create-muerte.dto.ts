import { IsDateString, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateMuerteDto {
  @IsOptional()
  @IsNumber()
  loteId?: number;

  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsNumber()
  cantidad: number;

  @IsOptional()
  @IsString()
  causa?: string;
}
