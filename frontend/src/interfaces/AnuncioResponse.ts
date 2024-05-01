export interface AnuncioResponse {
  idAnuncio: number;
  tipo?: string;
  bairro?: string;
  endereco: string;
  estado: string;
  cidade: string;
  reservado?: boolean;
}