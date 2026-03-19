import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Lote } from '../../lote/entities/lote.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';

@Entity('consumo_alimento')
export class ConsumoAlimento {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp with time zone', { default: () => 'now()' })
  fecha: Date;

  @ManyToOne(() => Lote, (lote) => lote.consumosAlimento, { nullable: true })
  @JoinColumn({ name: 'lote_id' })
  lote: Lote;

  @ManyToOne(() => Insumo, (insumo) => insumo.consumosAlimento, { nullable: true })
  @JoinColumn({ name: 'insumo_id' })
  insumo: Insumo;

  @Column('numeric', { precision: 10, scale: 2 })
  cantidad_kilos: number;

  @Column('int', { nullable: true })
  empleado_id: number;

  @Column('text', { nullable: true })
  observaciones: string;
}