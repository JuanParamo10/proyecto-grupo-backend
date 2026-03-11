import { IsString, IsInt, MinLength, IsPositive } from 'class-validator';

export class CreateEntregaDto {

    @IsString()
    @MinLength(3)
    quienRecibe: string;

    @IsInt()
    @IsPositive()
    cantidad: number;

    @IsString()
    @MinLength(1)
    observaciones: string;
}