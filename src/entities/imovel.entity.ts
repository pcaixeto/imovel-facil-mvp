import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TipoImovel } from './tipo.imovel.entity';

@Entity('tb_imovel')
export class Imovel {
  @PrimaryGeneratedColumn({ name: 'id_imovel' })
  idImovel: number;

  @Column({ name: 'id_proprietario' })
  idProprietario: number;

  @Column({ name: 'endereco', type: 'jsonb' })
  endereco: any;

  @ManyToOne(() => TipoImovel)
  @JoinColumn({ name: 'id_tipo_imovel' })
  tipoImovel: TipoImovel;

  @Column({ name: 'status_imovel', type: 'text', nullable: true })
  statusImovel: string;
}
