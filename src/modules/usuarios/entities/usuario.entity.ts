import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn() 
  id!: number;

  @Column() 
  nombre!: string;

  @Column() 
  apellidos!: string;

  @Column() 
  username!: string;

  @Column() 
  password!: string; 

  @Column() 
  email!: string;

  @Column({ default: true }) 
  activo!: boolean;

  @Column({ nullable: true }) 
  documento!: string;

  @Column({ nullable: true }) 
  telefono!: string;

  @Column({ nullable: true }) 
  direccion!: string;

  // 🔥 NUEVO: El cajón para guardar los switches de permisos 🔥
  @Column({ type: 'json', nullable: true })
  permisos!: any;
}