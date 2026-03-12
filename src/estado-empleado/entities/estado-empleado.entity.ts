import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Empleado } from '../../empleados/entities/empleado.entity';

@Entity('estado_empleado')
export class EstadoEmpleado {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  // Relación: Un estado (ej: 'Activo') puede pertenecer a muchos empleados
  @OneToMany(() => Empleado, (empleado) => empleado.estado)
  empleados: Empleado[];
}