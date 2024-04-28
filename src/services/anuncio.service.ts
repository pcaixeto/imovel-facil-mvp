import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anuncio } from 'src/entities/anuncio.entity';
import { Repository } from 'typeorm';
import { InfoAnuncioDto } from 'src/dto/infoAnuncio.dto';
import { UpdateAnuncioDto } from 'src/dto/updateAnuncio.dto';
import { Imovel } from 'src/entities/imovel.entity';
import { infoAnuncioDtoToAnuncio } from 'src/mapper/dtoToEntity.mapper';

@Injectable()
export class AnuncioService {
  constructor(
    @InjectRepository(Anuncio)
    private anuncioRepository: Repository<Anuncio>,
    @InjectRepository(Imovel)
    private imovelRepository: Repository<Imovel>,
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

  async editarAnuncio(updateAnuncioDto: UpdateAnuncioDto): Promise<void> {
    const anuncio = await this.anuncioRepository.findOne({
      where: { idAnuncio: updateAnuncioDto.idAnuncio },
      relations: ['imovel'],
    });
    if (!anuncio) {
      throw new NotFoundException(
        `Anúncio com ID ${updateAnuncioDto.idAnuncio} não encontrado`,
      );
    }
    const updatedAnuncio = Object.assign(anuncio, updateAnuncioDto);

    await this.anuncioRepository.save(updatedAnuncio);

    if (updateAnuncioDto.endereco && anuncio.imovel) {
      anuncio.imovel.endereco = updateAnuncioDto.endereco;
      await this.imovelRepository.save(anuncio.imovel);
    } else {
      console.log('Imóvel não encontrado para este anúncio.');
    }
    console.log('Anúncio atualizado com sucesso');
  }
}
