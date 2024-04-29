import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Anuncio } from './anuncio.entity';

@Entity('tb_tipo_imovel')
export class TipoImovel {
  @PrimaryGeneratedColumn({ name: 'id_tipo_imovel' })
  idTipoImovel: number;

  @Column({ name: 'tp_imovel', type: 'text' })
  tipoImovel: string;

  @OneToMany(() => Anuncio, (anuncio) => anuncio.tipoImovel)
  anuncios: Anuncio[];
}
