import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('unidad_medida')
export class UnidadMedida {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 10 })
  abreviatura: string;
}
