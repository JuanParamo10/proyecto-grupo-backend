import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: any) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  // Buscar por ID -> GET http://localhost:3000/usuarios/1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id); // El '+' convierte el texto a número
  }

  // Buscar por Slug -> GET http://localhost:3000/usuarios/perfil/juanperez_01
  @Get('perfil/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.usuariosService.findByUsername(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: any) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}