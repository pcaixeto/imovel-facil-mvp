// /* eslint-disable prettier/prettier */
// import { Anuncio } from 'src/entities/anuncio.entity';
// import { Imovel } from 'src/entities/imovel.entity';
// import { InfoAnuncioDto } from 'src/dto/infoAnuncio.dto';
// import { TipoImovel } from 'src/entities/tipoImovel.entity';

// export function infoAnuncioDtoToAnuncio(
//   imovel: Imovel,
//   infoAnuncioDto: InfoAnuncioDto,
// ): Anuncio {

//   const anuncio = new Anuncio();
//   anuncio.imovel = imovel;
//   anuncio.idProprietario = infoAnuncioDto.idProprietario;
//   anuncio.valorPrecoAnuncio = infoAnuncioDto.valorPrecoAnuncio;
//   anuncio.descricaoAnuncio = infoAnuncioDto.descricaoAnuncio;
//   anuncio.dhCriacao = new Date();
//   anuncio.dhExpiracao = new Date(anuncio.dhCriacao.getTime() + 6 * 30 * 24 * 60 * 60 * 1000); // somando 6 meses a partir da data de criacao
//   anuncio.origemAnuncio = 'Imovel Facil'; // hardcoded por enquanto

//   return anuncio;
// }

// export function infoAnuncioDtoToImovelMapper(infoAnuncioDto: InfoAnuncioDto): Imovel {
//   const imovel = new Imovel();
//   imovel.idProprietario = infoAnuncioDto.idProprietario;
//   imovel.endereco = infoAnuncioDto.endereco;
//   const tipoImovel = new TipoImovel();
//   tipoImovel.idTipoImovel = infoAnuncioDto.tipoImovel; //to jogando ID mesmo
//   imovel.tipoImovel = tipoImovel;
//   // imovel.tipoImovel = infoAnuncioDto.tipoImovel;
//   imovel.statusImovel = "Disponivel"; //hardcoded

//   return imovel;
// }
