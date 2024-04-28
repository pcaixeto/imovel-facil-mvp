import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anuncio } from 'src/entities/anuncio.entity';
import { Repository } from 'typeorm';
import { InfoAnuncioDto } from 'src/dto/infoAnuncio.dto';
import { Imovel } from 'src/entities/imovel.entity';
import { infoAnuncioDtoToAnuncio } from 'src/mapper/dtoToEntity.mapper';

@Injectable()
export class AnuncioService {
  constructor(
    @InjectRepository(Anuncio)
    private anuncioRepository: Repository<Anuncio>,
  ) {}

  async criarAnuncioTeste(anuncio: Anuncio): Promise<void> {
    this.anuncioRepository.save(anuncio);
  }

  async criarAnuncio(
    imovel: Imovel,
    infoAnuncioDto: InfoAnuncioDto,
  ): Promise<void> {
    const anuncio = infoAnuncioDtoToAnuncio(imovel, infoAnuncioDto);
    await this.anuncioRepository.save(anuncio);
  }

  async consultaAnuncios(): Promise<Anuncio[]> {
    return this.anuncioRepository.find();
  }
}
