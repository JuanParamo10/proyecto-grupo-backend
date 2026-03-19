import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumoAlimentoDto } from './create-consumo-alimento.dto';

export class UpdateConsumoAlimentoDto extends PartialType(CreateConsumoAlimentoDto) {}
