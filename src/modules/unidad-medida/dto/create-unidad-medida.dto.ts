import { IsString, MinLength } from 'class-validator';

export class CreateUnidadMedidaDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  abreviatura: string;
}
