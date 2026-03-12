import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EntregaProducto } from './entrega-producto.entity'; 

@Entity({ name: 'destinatario' })
export class Destinatario {
    @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  documento: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  telefono: string;

  @OneToMany(
    () => EntregaProducto,
    (entregaProducto) => entregaProducto.destinatario,
  )
  entregasProducto: EntregaProducto[];
}