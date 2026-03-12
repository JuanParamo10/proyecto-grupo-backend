import { IsString, IsInt, IsPositive, IsOptional, MinLength } from 'class-validator';

export class CreateGalponDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  capacidad?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
