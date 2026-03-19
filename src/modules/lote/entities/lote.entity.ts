import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Galpon } from '../../galpon/entities/galpon.entity';
import { ConsumoAlimento } from '../../consumo-alimento/entities/consumo-alimento.entity';
import { ProduccionDiaria } from '../../produccion/entities/produccion-diaria.entity';
import { Muerte } from '../../produccion/entities/muerte.entity';


@Entity('lote')
export class Lote {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  codigo: string;

  @ManyToOne(() => Galpon, (galpon) => galpon.lotes, { nullable: true })
  @JoinColumn({ name: 'galpon_id' })
  galpon: Galpon;

  @Column('int')
  galpon_id: number;

  @Column('int')
  cantidad_inicial: number;

  @Column('date')
  fecha_ingreso: Date;

  @Column('boolean', { default: true })
  activo: boolean;

  @OneToMany(() => ConsumoAlimento, (consumo) => consumo.lote)
  consumosAlimento: ConsumoAlimento[];

  @OneToMany(() => ProduccionDiaria, (produccion) => produccion.lote)
  producciones: ProduccionDiaria[];

  @OneToMany(() => Muerte, (muerte) => muerte.lote)
  muertes: Muerte[];
}
