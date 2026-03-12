import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lote')
export class Lote {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  codigo: string;

  @Column('int')
  galpon_id: number;

  @Column('int')
  cantidad_inicial: number;

  @Column('date')
  fecha_ingreso: Date;

  @Column('boolean', { default: true })
  activo: boolean;
}
