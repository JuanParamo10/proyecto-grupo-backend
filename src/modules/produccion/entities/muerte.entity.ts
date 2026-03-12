import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lote } from '../../lote/entities/lote.entity';

@Entity({ name: 'muerte' })
export class Muerte {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lote, (lote) => lote.muertes, { nullable: true })
  @JoinColumn({ name: 'loteId' })
  lote: Lote;

  @Column({ type: 'int', nullable: true })
  loteId: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha: Date;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  causa: string;
}
