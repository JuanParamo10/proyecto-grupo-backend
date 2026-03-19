import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
// Importa la entidad Rol cuando la tengas lista:
// import { Rol } from '../../rol/entities/rol.entity';

@Entity('usuario_rol')
export class UsuarioRol {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  // Descomenta esto cuando crees la tabla rol con el comando: nest g res rol
  /*
  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;
  */
}