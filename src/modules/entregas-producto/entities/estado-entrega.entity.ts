import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'; 

@Entity({ name: 'estado_entrega' })
export class EstadoEntrega {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  @OneToMany('EntregaProducto', 'estadoEntrega')
  entregasProducto: any[];
}
