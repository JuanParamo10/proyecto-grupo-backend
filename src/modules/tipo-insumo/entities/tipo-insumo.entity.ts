import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_insumo')
export class TipoInsumo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 255, nullable: true })
  descripcion: string;
}
