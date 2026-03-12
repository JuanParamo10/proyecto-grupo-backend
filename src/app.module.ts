import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importamos todos los módulos de tu sistema
import { UsuariosModule } from './usuarios/usuarios.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { EstadoEmpleadoModule } from './estado-empleado/estado-empleado.module';
import { UsuarioRolModule } from './usuario-rol/usuario-rol.module';

@Module({
  imports: [
    // Configuración de conexión a PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password123',
      database: 'avicolabase_db',
      autoLoadEntities: true,
      synchronize: false, // <-- ¡CÁMBIALO A FALSE!
    }),
    
    // AQUÍ REGISTRAMOS LOS MÓDULOS PARA QUE RESPONDAN EN POSTMAN
    UsuariosModule,
    EmpleadosModule,
    EstadoEmpleadoModule,
    UsuarioRolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}