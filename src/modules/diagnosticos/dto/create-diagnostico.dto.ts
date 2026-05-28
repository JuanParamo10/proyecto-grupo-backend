import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateDiagnosticoDto {
  @IsOptional() @IsString() fecha?: string;
  @IsOptional() @IsString() tipo?: string;
  @IsOptional() @IsNumber() loteId?: number;
  @IsOptional() @IsString() descripcion?: string;
  @IsOptional() @IsString() tratamiento?: string;
  @IsOptional() @IsNumber() cantidad?: number;
  @IsOptional() @IsString() veterinario?: string;
  @IsOptional() @IsString() observaciones?: string;
  @IsOptional() @IsString() estado?: string;
}