import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('tb_anuncio', { schema: 'public' })
export class Anuncio {
  @PrimaryGeneratedColumn('increment', { name: 'id_anuncio' })
  idAnuncio: number;

  @Column('text', { name: 'contatos', nullable: false })
  contatos: string;
}
