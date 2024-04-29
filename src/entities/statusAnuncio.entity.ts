import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Anuncio } from './anuncio.entity';

@Entity('tb_status_anuncio')
export class StatusAnuncio {
  @PrimaryGeneratedColumn({ name: 'id_status_anuncio' })
  idStatusAnuncio: number;

  @Column({ name: 'desc_tipo_imovel' })
  descricaoTipoImovel: string;

  @OneToMany(() => Anuncio, (anuncio) => anuncio.statusAnuncio)
  anuncios: Anuncio[];
}
