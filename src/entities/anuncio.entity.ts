import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Imovel } from './imovel.entity';

@Entity('tb_anuncio', { schema: 'public' })
export class Anuncio {
  @PrimaryGeneratedColumn({ name: 'id_anuncio' })
  idAnuncio: number;

  @ManyToOne(() => Imovel)
  @JoinColumn({ name: 'id_imovel' })
  imovel: Imovel;

  @Column({ name: 'id_proprietario' })
  idProprietario: number;

  @Column({ name: 'vl_preco_anuncio', type: 'numeric' })
  valorPrecoAnuncio: number;

  @Column({ name: 'ds_anuncio', type: 'text' })
  descricaoAnuncio: string;

  @Column({ name: 'dh_criacao', type: 'timestamp' })
  dhCriacao: Date;

  @Column({ name: 'dh_expiracao', type: 'timestamp', nullable: true })
  dhExpiracao: Date;

  @Column({ name: 'origem_anuncio', type: 'text', nullable: true })
  origemAnuncio: string;
}
