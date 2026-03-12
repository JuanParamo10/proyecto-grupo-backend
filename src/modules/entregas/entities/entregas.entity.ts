import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Insumo } from '../../insumos/entities/insumo.entity';

@Entity({ name: 'entregas' })
export class Entrega {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  quienRecibe: string;

  @Column('int')
  cantidad: number; 

  @Column('text', { nullable: true })
  observaciones: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @ManyToOne(
  () => Insumo, 
  (insumo) => insumo.entregas, 
  { eager: true }
)
insumo: Insumo;
}