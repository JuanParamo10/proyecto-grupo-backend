import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Lote } from '../../lote/entities/lote.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';

@Entity('consumo_alimento')
export class ConsumoAlimento {

  @PrimaryGeneratedColumn()
  id!: number; // Ponemos !

  @Column('timestamp with time zone', { default: () => 'now()' })
  fecha!: Date; // Ponemos !

  @ManyToOne(() => Lote, (lote) => lote.consumosAlimento, { nullable: true })
  @JoinColumn({ name: 'lote_id' })
  lote?: Lote; // Ponemos ? porque es nullable

  @Column('int')
  lote_id!: number; // Ponemos !

  @ManyToOne(() => Insumo, (insumo) => insumo.consumosAlimento, { nullable: true })
  @JoinColumn({ name: 'insumo_id' })
  insumo?: Insumo; // Ponemos ? porque es nullable

  // 🔥 EL CAMBIO MAESTRO: UUID Y STRING 🔥
  @Column('uuid')
  insumo_id!: string; 

  @Column('numeric', { precision: 10, scale: 2 })
  cantidad_kilos!: number; // Ponemos !

  @Column('int', { nullable: true })
  empleado_id?: number; // Ponemos ? porque dice nullable: true

  @Column('text', { nullable: true })
  observaciones?: string; // Ponemos ? porque dice nullable: true
}