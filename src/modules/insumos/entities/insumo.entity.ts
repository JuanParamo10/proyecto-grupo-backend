import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Entrega } from '../../entregas/entities/entregas.entity';
import { ConsumoAlimento } from '../../consumo-alimento/entities/consumo-alimento.entity';

@Entity({ name: 'insumos' })
export class Insumo {
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column('text', { unique: true })
    nombre: string;

    @Column('text')
    descripcion: string;

    @Column('int', { default: 0 })
    stock: number; 

    @Column('text')
    unidadMedida: string; 

    @Column({
    type: 'text',
    default: 'PRODUCTO' 
    })
    tipo: string;

    @OneToMany(
    () => Entrega, 
    (entrega) => entrega.insumo
    )
    entregas: Entrega[]; 

    @OneToMany(
    () => ConsumoAlimento,
    (consumoAlimento) => consumoAlimento.insumo
    )
    consumosAlimento: ConsumoAlimento[];
}
