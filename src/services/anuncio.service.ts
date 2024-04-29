import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnuncioEditadoDto } from 'src/dto/anuncioEditado.dto';
import { Anuncio } from 'src/entities/anuncio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnuncioService {
  constructor(
    @InjectRepository(Anuncio)
    private anuncioRepository: Repository<Anuncio>,
  ) {}

  async criarAnuncio(anuncio: Anuncio): Promise<Anuncio> {
    return this.anuncioRepository.save(anuncio);
  }

  async consultaAnuncios(): Promise<Anuncio[]> {
    return this.anuncioRepository.find();
  }

  async editarAnuncio(
    id: number,
    anuncioEditadoDto: AnuncioEditadoDto,
  ): Promise<Anuncio> {
    const anuncio = await this.anuncioRepository.findOne({
      where: { idAnuncio: id },
    });

    if (!anuncio) {
      throw new NotFoundException(`Anúncio com ID ${id} não encontrado.`);
    }

    this.anuncioRepository.merge(anuncio, anuncioEditadoDto);
    return this.anuncioRepository.save(anuncio);
  }

  async deletarAnuncio(id: number): Promise<void> {
    const result = await this.anuncioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Anúncio com ID ${id} não encontrado.`);
    }
  }
}

// async criarAnuncio(
//   imovel: Imovel,
//   infoAnuncioDto: InfoAnuncioDto,
// ): Promise<void> {
//   const anuncio = infoAnuncioDtoToAnuncio(imovel, infoAnuncioDto);
//   await this.anuncioRepository.save(anuncio);
//
