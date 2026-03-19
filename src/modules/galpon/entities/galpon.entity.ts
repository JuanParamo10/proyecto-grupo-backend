import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lote } from '../../lote/entities/lote.entity';

@Entity('galpon')
export class Galpon {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 120 })
  nombre: string;

  @Column('int', { nullable: true })
  capacidad: number;

  @Column('text', { nullable: true })
  descripcion: string;

  @OneToMany(() => Lote, (lote) => lote.galpon)
  lotes: Lote[];
}
