import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Anuncio } from './anuncio.entity';

@Entity('tb_anunciante')
export class Anunciante {
  @PrimaryGeneratedColumn({ name: 'id_anunciante' })
  idAnunciante!: number;

  @Column({ name: 'nome_anunciante' })
  nomeAnunciante!: string;

  @Column({ name: 'email_anunciante' })
  emailAnunciante!: string;

  @Column({ name: 'password' })
  password!: string;

  @OneToMany(() => Anuncio, (anuncio) => anuncio.anunciante)
  anuncios!: Anuncio[];
}
