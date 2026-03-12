import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateEntregaDto {
    @IsString()
    quienRecibe: string;

    @IsNumber()
    cantidad: number;  

    @IsOptional()  
    @IsString()
    observaciones?: string;

    @IsUUID() 
    insumoId: string;
}