import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm';
import { Empleado } from '../../empleados/entities/empleado.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  apellidos: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  // ¡Recuerda que en el futuro la contraseña debe ir encriptada!
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  // Relación con Empleado
  @OneToOne(() => Empleado, (empleado) => empleado.usuario)
  empleado: Empleado;
}