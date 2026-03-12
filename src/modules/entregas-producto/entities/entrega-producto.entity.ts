import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Destinatario } from './destinatario.entity';
import { EstadoEntrega } from './estado-entrega.entity';
import { EntregaDetalle } from './entrega-detalle.entity'; 

@Entity({ name: 'entrega_producto' })
export class EntregaProducto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  numeroRemision: string;

  @ManyToOne(
    () => Destinatario,
    (destinatario) => destinatario.entregasProducto,
    { nullable: true },
  )
  destinatario: Destinatario;

  @CreateDateColumn()
  fecha: Date;

  @ManyToOne(
    () => EstadoEntrega,
    (estadoEntrega) => estadoEntrega.entregasProducto,
    { nullable: true },
  )
  estadoEntrega: EstadoEntrega;

  @Column({ type: 'text', nullable: true })
  observacionesGenerales: string;

    @OneToMany('EntregaDetalle', 'entrega')
  detalles: EntregaDetalle[];
}
