
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { EstadoEmpleado } from '../../estado-empleado/entities/estado-empleado.entity';

@Entity('empleado')
export class Empleado {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  cargo: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  // Llave foránea a Usuario
  @OneToOne(() => Usuario, (usuario) => usuario.empleado)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  // Llave foránea a EstadoEmpleado
  @ManyToOne(() => EstadoEmpleado)
  @JoinColumn({ name: 'estado_empleado_id' })
  estado: EstadoEmpleado;
}