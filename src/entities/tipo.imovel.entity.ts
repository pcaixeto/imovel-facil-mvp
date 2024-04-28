import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_tipo_imovel')
export class TipoImovel {
  @PrimaryGeneratedColumn({ name: 'id_tipo_imovel' })
  idTipoImovel: number;

  @Column({ name: 'tp_imovel', type: 'text' })
  tipoImovel: string;
}
