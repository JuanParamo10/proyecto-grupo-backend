import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto'; // <-- Importamos tu DTO

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // <-- AQUÍ ESTÁ LA MAGIA: Usamos CreateUsuarioDto en lugar de 'any' -->
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) { 
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  // Buscar por ID -> GET http://localhost:3000/api/usuarios/1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  // Buscar por Slug -> GET http://localhost:3000/api/usuarios/perfil/juan_01
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