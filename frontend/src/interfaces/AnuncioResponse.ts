export enum TipoImovel {
  REPUBLICA = 1,
  APARTAMENTO = 2,
  CASA = 3,
}

export interface AnuncioResponse {
  nomeAnuncio: string;
  idAnuncio: number;
  valorVendaImovel: number;
  descricaoAnuncio: string;
  tipoImovel?: { idTipoImovel: number; tipoImovel: string };
  bairro?: string;
  endereco: string;
  estado: string;
  cidade: string;
  reservado?: boolean;
}
