import { IsOptional, IsString, IsNumber } from 'class-validator';

export class AnuncioEditadoDto {
  @IsOptional()
  @IsString()
  nomeAnuncio?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  descricaoAnuncio?: string;

  @IsOptional()
  @IsNumber()
  valorVendaImovel?: number;

  @IsOptional()
  @IsNumber()
  valorAluguelImovel?: number;

  @IsOptional()
  @IsNumber()
  valorCondominioApto?: number;

  @IsOptional()
  @IsNumber()
  tamanhoImovel?: number;

  @IsOptional()
  @IsNumber()
  numeroQuartos?: number;

  @IsOptional()
  @IsNumber()
  numeroMoradoresRepublica?: number;
}
