import { IsString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEntregaDetalleDto {
  @IsOptional()
  @IsString()
  nombreProducto?: string;

  @IsNumber()
  cantidad: number;
}

export class CreateEntregaProductoDto {
  @IsOptional()
  @IsString()
  numeroRemision?: string;

  @IsOptional()
  @IsNumber()
  destinatarioId?: number;

  @IsOptional()
  @IsNumber()
  estadoEntregaId?: number;

  @IsOptional()
  @IsString()
  observacionesGenerales?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEntregaDetalleDto)
  detalles?: CreateEntregaDetalleDto[];
}
