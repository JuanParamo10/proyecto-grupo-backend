import { IsString, IsOptional } from 'class-validator';

export class CreateDestinatarioDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  documento?: string;

  @IsOptional()
  @IsString()
  telefono?: string;
}
