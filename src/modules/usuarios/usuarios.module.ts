import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
// 🔥 1. Importamos la entidad Empleado 🔥
import { Empleado } from '../empleados/entities/empleado.entity'; 

@Module({
  // 🔥 2. Le damos permiso al módulo de Usuarios para usar ambas tablas 🔥
  imports: [TypeOrmModule.forFeature([Usuario, Empleado])], 
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}