import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulos de tus compañeros (La Granja)
import { GalponModule } from './modules/galpon/galpon.module';
import { LoteModule } from './modules/lote/lote.module';
import { InsumosModule } from './modules/insumos/insumos.module';
import { ProduccionModule } from './modules/produccion/produccion.module';
import { ConsumoAlimentoModule } from './modules/consumo-alimento/consumo-alimento.module';
import { EntregasModule } from './modules/entregas/entregas.module';
import { EntregasProductoModule } from './modules/entregas-producto/entregas-producto.module';
import { TipoInsumoModule } from './modules/tipo-insumo/tipo-insumo.module';
import { UnidadMedidaModule } from './modules/unidad-medida/unidad-medida.module';

// Tus módulos (Ahora dentro de modules)
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { EmpleadosModule } from './modules/empleados/empleados.module';
import { EstadoEmpleadoModule } from './modules/estado-empleado/estado-empleado.module';
import { UsuarioRolModule } from './modules/usuario-rol/usuario-rol.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
 TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123',
      database: process.env.DB_NAME || 'avicola_db',
      autoLoadEntities: true,
      synchronize: true, // Esto creará las tablas de tus compañeras automáticamente
    }),
    // REGISTRO DE TODOS LOS MÓDULOS UNIFICADOS
    GalponModule,
    LoteModule,
    InsumosModule,
    TipoInsumoModule,
    UnidadMedidaModule,
    ConsumoAlimentoModule,
    EntregasModule,
    EntregasProductoModule,
    ProduccionModule,
    UsuariosModule,
    EmpleadosModule,
    EstadoEmpleadoModule,
    UsuarioRolModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}