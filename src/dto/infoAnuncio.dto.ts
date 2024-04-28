/* eslint-disable prettier/prettier */

export interface InfoAnuncioDto {
  idProprietario: number;
  valorPrecoAnuncio: number;
  endereco: any;
  tipoImovel: number;
  descricaoAnuncio: string;
  dataHoraCriacao: Date;
  dataHoraExpiracao: Date;
  origemAnuncio: string;
}
