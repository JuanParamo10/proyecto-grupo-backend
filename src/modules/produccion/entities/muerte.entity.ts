import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'muerte' })
export class Muerte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  loteId: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha: Date;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  causa: string;
}
