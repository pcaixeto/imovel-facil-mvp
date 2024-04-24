import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('tb_anuncio', { schema: 'public' })
export class Anuncio {
  @PrimaryGeneratedColumn('increment', { name: 'id_anuncio' })
  idAnuncio: number;

  // @Column('timestamp', { name: 'dh_postagem', nullable: false })
  // dhPostagem: Date;

  @Column('text', { name: 'contatos', nullable: false })
  contatos: string;
}
