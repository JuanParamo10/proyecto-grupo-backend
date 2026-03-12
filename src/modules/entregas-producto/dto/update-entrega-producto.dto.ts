import { PartialType } from '@nestjs/mapped-types';
import { CreateEntregaProductoDto } from './create-entrega-producto.dto';

export class UpdateEntregaProductoDto extends PartialType(CreateEntregaProductoDto) {}
