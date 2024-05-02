export interface AnuncioResponse {
  nomeAnuncio: string;
  idAnuncio: number;
  valorVendaImovel: number;
  descricaoAnuncio: string;
  tipo?: string;
  bairro?: string;
  endereco: string;
  estado: string;
  cidade: string;
  reservado?: boolean;
}