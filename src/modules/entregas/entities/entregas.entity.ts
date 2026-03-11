import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('entregas') 
export class Entrega {

  @PrimaryGeneratedColumn() 
    id: number;

    @Column('text')
    quienRecibe: string;

    @Column('int')
    cantidad: number;

    @Column('text', { nullable: true })
    observaciones: string;
}