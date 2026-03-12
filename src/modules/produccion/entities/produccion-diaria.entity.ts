import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'produccion_diaria' })
export class ProduccionDiaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
fecha: Date;

  @Column({ type: 'int', nullable: true })
  loteId: number;

  @Column({ type: 'int', nullable: true })
  cantidadTotal: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;
}
