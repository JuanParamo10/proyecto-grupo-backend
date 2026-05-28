import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'diagnosticos' })
export class Diagnostico {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date', nullable: true })
  fecha?: string;

  @Column({ type: 'varchar', nullable: true })
  tipo?: string;

  @Column({ type: 'int', nullable: true })
  loteId?: number;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'text', nullable: true })
  tratamiento?: string;

  @Column({ type: 'int', nullable: true })
  cantidad?: number;

  @Column({ type: 'varchar', nullable: true })
  veterinario?: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @Column({ type: 'varchar', default: 'Activo' })
  estado!: string;
}