import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('consumo_alimento')
export class ConsumoAlimento {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp with time zone', { default: () => 'now()' })
  fecha: Date;

  @Column('int')
  lote_id: number;

  @Column('int')
  insumo_id: number;

  @Column('numeric', { precision: 10, scale: 2 })
  cantidad_kilos: number;

  @Column('int', { nullable: true })
  empleado_id: number;

  @Column('text', { nullable: true })
  observaciones: string;
}
