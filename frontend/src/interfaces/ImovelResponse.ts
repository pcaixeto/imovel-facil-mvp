export enum TipoImovel {
  REPUBLICA = 1,
  APARTAMENTO = 2,
  CASA = 3,
}

export interface ImovelResponse {
  idImovel: number;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  tamanhoImovel: number;
  numeroQuartos: number;
  numeroMoradoresRepublica?: number;
  tipoImovel?: { idTipoImovel: number; tipoImovel: string };
  clienteId: number; // Assuming you might want to include the owner's/client's ID if needed for authorization checks or display.
}
