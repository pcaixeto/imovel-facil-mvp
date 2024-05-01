export interface AnuncioDTO {
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
  tipoImovel: string;
  fotos?: FileList | null;
  contatos?: string;
}
