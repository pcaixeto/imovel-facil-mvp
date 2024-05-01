import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Anunciante } from './anunciante.entity';
import { TipoImovel } from './tipoImovel.entity';
import { StatusAnuncio } from './statusAnuncio.entity';

@Entity('tb_anuncio', { schema: 'public' })
export class Anuncio {
  @PrimaryGeneratedColumn({ name: 'id_anuncio' })
  idAnuncio!: number;

  @Column({ name: 'nome_anuncio' })
  nomeAnuncio!: string;

  @Column({ name: 'endereco' })
  endereco!: string;

  @Column({ name: 'bairro' })
  bairro!: string;

  @Column({ name: 'cidade' })
  cidade!: string;

  @Column({ name: 'estado' })
  estado!: string;

  @Column({ name: 'descricao_anuncio' })
  descricaoAnuncio!: string;

  @Column({ name: 'valor_venda_imovel' })
  valorVendaImovel!: number;

  @Column({ name: 'valor_aluguel_imovel' })
  valorAluguelImovel!: number;

  @Column({ name: 'valor_condominio_apto' })
  valorCondominioApto!: number;

  @Column({ name: 'dh_publicacao' })
  dataHoraPublicacao!: Date;

  @Column({ name: 'dh_expiracao_publicacao' })
  dataHoraExpiracaoPublicacao!: Date;

  @Column({ name: 'tamanho_imovel' })
  tamanhoImovel!: number;

  @Column({ name: 'numero_quartos' })
  numeroQuartos!: number;

  @Column({ name: 'numero_moradores_republica' })
  numeroMoradoresRepublica!: number;

  @ManyToOne(() => Anunciante, (anunciante) => anunciante.anuncios)
  @JoinColumn({ name: 'id_anunciante' })
  anunciante!: Anunciante;

  @ManyToOne(() => TipoImovel, (tipoImovel) => tipoImovel.anuncios)
  @JoinColumn({ name: 'tipo_imovel' })
  tipoImovel!: TipoImovel;

  @ManyToOne(() => StatusAnuncio, (statusAnuncio) => statusAnuncio.anuncios)
  @JoinColumn({ name: 'status_anuncio' })
  statusAnuncio!: StatusAnuncio;

  constructor() {
    const now = new Date();
    this.dataHoraPublicacao = now;
    this.dataHoraExpiracaoPublicacao = new Date(
      now.getTime() + 30 * 24 * 60 * 60 * 1000,
    ); // 30 days later
    this.anunciante = { idAnunciante: 1 } as Anunciante; // Hardcoded anunciante
    this.statusAnuncio = { idStatusAnuncio: 1 } as StatusAnuncio; // Assuming status 'DISPONIVEL'
  }
}

// @ManyToOne(() => Imovel)
// @JoinColumn({ name: 'id_imovel' })
// imovel: Imovel; caso nao funcione
