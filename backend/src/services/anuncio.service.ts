import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnuncioDTO } from 'src/dto/AnuncioDTO.dto';
import { AnuncioEditadoDto } from 'src/dto/anuncioEditado.dto';
import { Anuncio } from 'src/entities/anuncio.entity';
import { StatusAnuncio } from 'src/entities/statusAnuncio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnuncioService {
  constructor(
    @InjectRepository(Anuncio)
    private anuncioRepository: Repository<Anuncio>,
    @InjectRepository(StatusAnuncio)
    private statusAnuncioRepository: Repository<StatusAnuncio>,
  ) {}

  // async criarAnuncio(anuncio: Anuncio): Promise<Anuncio> {
  //   return this.anuncioRepository.save(anuncio);
  // }

  async criarAnuncio(anuncioDto: AnuncioDTO): Promise<Anuncio> {
    const anuncio = new Anuncio();
    // Copie os valores do DTO para a nova entidade Anuncio
    Object.assign(anuncio, anuncioDto);
    // Inicialize quaisquer campos necessários
    anuncio.dataHoraPublicacao = new Date();
    anuncio.dataHoraExpiracaoPublicacao = new Date(
      anuncio.dataHoraPublicacao.getTime() + 30 * 24 * 60 * 60 * 1000,
    );
    // Busca o status 'Disponível'
    const statusDisponivel = await this.statusAnuncioRepository.findOne({
      where: { descricaoTipoImovel: 'Disponível' },
    });
    if (!statusDisponivel)
      throw new Error('Status "Disponível" não encontrado.');
    anuncio.statusAnuncio = statusDisponivel;
    return await this.anuncioRepository.save(anuncio);
  }

  async buscarAnuncios(
    estado: string,
    cidade: string,
    bairro: string,
  ): Promise<Anuncio[]> {
    const query = this.anuncioRepository.createQueryBuilder('anuncio');

    if (estado) {
      query.andWhere('anuncio.estado = :estado', { estado });
    }

    if (cidade) {
      query.andWhere('anuncio.cidade = :cidade', { cidade });
    }

    if (bairro) {
      query.andWhere('anuncio.bairro = :bairro', { bairro });
    }

    return query.getMany();
  }

  async consultarAnuncioPorId(id: number): Promise<Anuncio> {
    return this.anuncioRepository.findOne({ where: { idAnuncio: id } });
  }

  async consultarAnunciosReservados(): Promise<Anuncio[]> {
    return this.anuncioRepository.find({
      where: {
        statusAnuncio: { idStatusAnuncio: 3 },
      },
      relations: ['statusAnuncio'],
    });
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

  async atualizarStatusAnuncio(id: number): Promise<Anuncio> {
    const anuncio = await this.anuncioRepository.findOne({
      where: { idAnuncio: id },
    });
    if (!anuncio) {
      throw new NotFoundException(`Anúncio com id ${id} não encontrado.`);
    }

    anuncio.statusAnuncio = { idStatusAnuncio: 3 } as StatusAnuncio;
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
