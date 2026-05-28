import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { Empleado } from '../../empleados/entities/empleado.entity'; // <-- Comentado para evitar errores

@Entity('estado_empleado')
export class EstadoEmpleado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  nombre!: string;

  // 🔥 RELACIÓN COMENTADA PARA EVITAR EL ERROR TS2339 🔥
  // @OneToMany(() => Empleado, (empleado) => empleado.estado)
  // empleados!: Empleado[];
}