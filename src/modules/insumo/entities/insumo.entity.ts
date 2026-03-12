import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('insumo')
export class Insumo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  nombre: string;

  @Column('int')
  tipo_insumo_id: number;

  @Column('int')
  unidad_medida_id: number;

  @Column('numeric', { precision: 12, scale: 2, default: 0 })
  stock_actual: number;
}
