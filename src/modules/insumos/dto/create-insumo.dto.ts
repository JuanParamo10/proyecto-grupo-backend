import { IsString, IsInt, IsPositive, IsIn, IsOptional } from 'class-validator';

export class CreateInsumoDto {
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsInt()
    @IsPositive()
    stock: number;

    @IsString()
    unidadMedida: string;

    @IsOptional()
    @IsString()
    @IsIn(['INSUMO', 'PRODUCTO']) 
    tipo?: string;
}