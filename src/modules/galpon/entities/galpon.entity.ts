import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
