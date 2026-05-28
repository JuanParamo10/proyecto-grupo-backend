import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('empleado')
export class Empleado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, default: 'Operario' }) 
  cargo!: string;

  @Column({ name: 'usuario_id' })
  usuarioId!: number;

  @Column({ name: 'estado_empleado_id', default: 1 })
  estadoEmpleadoId!: number;
}