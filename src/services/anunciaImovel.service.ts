import { Injectable } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { ImovelService } from './imovel.service';
import { InfoAnuncioDto } from 'src/dto/infoAnuncio.dto';
import { randomInt } from 'crypto';

@Injectable()
export class AnunciaImovelService {
  constructor(
    private imovelService: ImovelService,
    private anuncioService: AnuncioService,
  ) {}

  async anunciarImovel(infoAnuncioDto: InfoAnuncioDto): Promise<void> {
    infoAnuncioDto.idProprietario = randomInt(1, 9999); // gerando ids aleatorios antes da existencia da tb_cliente
    console.log('infoAnuncioDto: ');
    console.log(infoAnuncioDto);

    const imovel = await this.imovelService.criarImovel(infoAnuncioDto);
    await this.anuncioService.criarAnuncio(imovel, infoAnuncioDto);

    console.log('Anuncio do imovel criado com sucesso');
  }
}
