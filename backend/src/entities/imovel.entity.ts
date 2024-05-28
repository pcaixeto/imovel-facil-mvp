import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from './cliente.entity';
import { TipoImovel } from './tipoImovel.entity';

@Entity('tb_imovel', { schema: 'public' })
export class Imovel {
  @PrimaryGeneratedColumn({ name: 'id_imovel' })
  idImovel!: number;

  @Column({ name: 'endereco' })
  endereco!: string;

  @Column({ name: 'bairro' })
  bairro!: string;

  @Column({ name: 'cidade' })
  cidade!: string;

  @Column({ name: 'estado' })
  estado!: string;

  @Column({ name: 'tamanho_imovel' })
  tamanhoImovel!: number;

  @Column({ name: 'numero_quartos' })
  numeroQuartos!: number;

  @Column({ name: 'numero_moradores_republica' })
  numeroMoradoresRepublica!: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.imoveis)
  @JoinColumn({ name: 'id_cliente' })
  cliente!: Cliente;

  @ManyToOne(() => TipoImovel, (tipoImovel) => tipoImovel.imoveis, {
    eager: true,
  })
  @JoinColumn({ name: 'tipo_imovel' })
  tipoImovel!: TipoImovel;
}
