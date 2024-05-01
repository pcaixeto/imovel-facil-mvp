export enum TipoImovel {
  REPUBLICA = 1,
  APARTAMENTO = 2,
  CASA = 3,
}

export interface AnuncioDTO {
  id?: number;
  nomeAnuncio: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  descricaoAnuncio: string;
  valorVendaImovel: number;
  valorAluguelImovel: number;
  valorCondominioApto: number;
  tamanhoImovel: number;
  numeroQuartos: number;
  numeroMoradoresRepublica?: number;
  tipoImovel: TipoImovel;
  fotos?: FileList | null;
  contatos?: string;
}
