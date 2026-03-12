import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lote } from '../../lote/entities/lote.entity';

@Entity({ name: 'produccion_diaria' })
export class ProduccionDiaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha: Date;

  @ManyToOne(() => Lote, (lote) => lote.producciones, { nullable: true })
  @JoinColumn({ name: 'loteId' })
  lote: Lote;

  @Column({ type: 'int', nullable: true })
  loteId: number;

  @Column({ type: 'int', nullable: true })
  cantidadTotal: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;
}
