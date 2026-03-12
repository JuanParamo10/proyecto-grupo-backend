import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { EntregaProducto } from './entrega-producto.entity';

@Entity({ name: 'entrega_detalle' })
export class EntregaDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  producto: string;

  @Column({ type: 'int', nullable: true })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  subtotal: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @ManyToOne(
    () => EntregaProducto,
    (entrega) => entrega.detalles,
    { nullable: true },
  )
  entrega: EntregaProducto;
}
