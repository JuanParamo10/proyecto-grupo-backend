import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { GalponService } from './galpon.service';
import { CreateGalponDto } from './dto/create-galpon.dto';
import { UpdateGalponDto } from './dto/update-galpon.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('galpon')
export class GalponController {
  constructor(private readonly galponService: GalponService) {}

  @Post()
  create(@Body() createGalponDto: CreateGalponDto) {
    return this.galponService.create(createGalponDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galponService.findOne(+id);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.galponService.findAll(paginationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galponService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateGalponDto: UpdateGalponDto
  ) {
    return this.galponService.update(+id, updateGalponDto);
  }
}
