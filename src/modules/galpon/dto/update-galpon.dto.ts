import { PartialType } from '@nestjs/mapped-types';
import { CreateGalponDto } from './create-galpon.dto';

export class UpdateGalponDto extends PartialType(CreateGalponDto) {}
