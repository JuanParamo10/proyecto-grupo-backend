import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lote } from '../../lote/entities/lote.entity';

@Entity({ name: 'produccion_diaria' })
export class ProduccionDiaria {
  @PrimaryGeneratedColumn()
  id!: number; // Ponemos !

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha!: Date; // Ponemos !

  @ManyToOne(() => Lote, (lote) => lote.producciones, { nullable: true })
  @JoinColumn({ name: 'loteId' })
  lote?: Lote; // Ponemos ? porque es nullable

  @Column({ type: 'int', nullable: true })
  loteId?: number; // Ponemos ?

  @Column({ type: 'int', nullable: true })
  cantidadTotal?: number; // Ponemos ?

  @Column({ type: 'text', nullable: true })
  observaciones?: string; // Ponemos ?

  // 🔥 NUEVAS COLUMNAS (¡Ahora sí están adentro de la clase!) 🔥
  @Column('int', { default: 0 })
  jumbo!: number;

  @Column('int', { default: 0 })
  aaa!: number;

  @Column('int', { default: 0 })
  aa!: number;

  @Column('int', { default: 0 })
  a!: number;

  @Column('int', { default: 0 })
  b!: number;

  @Column('int', { default: 0 })
  c!: number;

  @Column('varchar', { nullable: true })
  turno?: string;

  @Column('varchar', { nullable: true })
  encargado?: string;
}