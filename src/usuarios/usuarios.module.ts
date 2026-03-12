import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- Importar esto
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity'; // <-- Importar tu entidad

@Module({
  // Tienes que registrar la entidad aquí:
  imports: [TypeOrmModule.forFeature([Usuario])], 
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}