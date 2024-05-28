import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Anuncio } from './anuncio.entity';
import { TipoCliente } from './tipoCliente.entity';
import { Imovel } from './imovel.entity';

@Entity('tb_cliente')
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  idCliente!: number;

  @Column({ name: 'nome_cliente' })
  nomeCliente!: string;

  @Column({ name: 'email_cliente' })
  emailCliente!: string;

  @Column({ name: 'password_cliente' })
  passwordCliente!: string;

  @ManyToOne(() => TipoCliente, (tipoCliente) => tipoCliente.clientes, {
    eager: true,
  })
  @JoinColumn({ name: 'id_tipo_cliente' })
  tipoCliente!: TipoCliente;

  @OneToMany(() => Anuncio, (anuncio) => anuncio.anunciante)
  anuncios!: Anuncio[];

  @OneToMany(() => Imovel, (imovel) => imovel.cliente)
  imoveis!: Imovel[];
}
