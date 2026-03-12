import { PartialType } from '@nestjs/mapped-types';
import { CreateProduccionDiariaDto } from './create-produccion-diaria.dto';
import { CreateMuerteDto } from './create-muerte.dto';

export class UpdateProduccionDiariaDto extends PartialType(CreateProduccionDiariaDto) {}

export class UpdateMuerteDto extends PartialType(CreateMuerteDto) {}
