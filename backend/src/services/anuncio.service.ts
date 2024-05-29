import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnuncioDTO, PlanoAssinatura } from 'src/dto/AnuncioDTO.dto';
import { AnuncioEditadoDto } from 'src/dto/anuncioEditado.dto';
import { Anuncio } from 'src/entities/anuncio.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { StatusAnuncio } from 'src/entities/statusAnuncio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnuncioService {
  constructor(
    @InjectRepository(Anuncio)
    private anuncioRepository: Repository<Anuncio>,
    @InjectRepository(StatusAnuncio)
    private statusAnuncioRepository: Repository<StatusAnuncio>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async criarAnuncio(
    anuncioDto: AnuncioDTO,
    idCliente: number,
  ): Promise<Anuncio> {
    const anuncio = new Anuncio();
    // Copie os valores do DTO para a nova entidade Anuncio
    Object.assign(anuncio, anuncioDto);
    anuncio.anunciante = await this.clienteRepository.findOne({
      where: { idCliente: idCliente },
    });
    anuncio.dataHoraPublicacao = new Date();

    switch (anuncioDto.planoAssinatura) {
      case PlanoAssinatura.PREMIUM:
        anuncio.dataHoraExpiracaoPublicacao = new Date(
          anuncio.dataHoraPublicacao.getTime() + 90 * 24 * 60 * 60 * 1000,
        );
        break;
      case PlanoAssinatura.BLACK:
        anuncio.dataHoraExpiracaoPublicacao = new Date(
          anuncio.dataHoraPublicacao.getTime() + 270 * 24 * 60 * 60 * 1000,
        );
        break;
      case PlanoAssinatura.FREE:
      default:
        anuncio.dataHoraExpiracaoPublicacao = new Date(
          anuncio.dataHoraPublicacao.getTime() + 20 * 24 * 60 * 60 * 1000,
        );
        break;
    }
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

  async consultarAnunciosDisponiveis(): Promise<Anuncio[]> {
    return this.anuncioRepository.find({
      where: {
        statusAnuncio: { idStatusAnuncio: 1 },
      },
      relations: ['statusAnuncio'],
    });
  }

  async consultarAnunciosReservados(): Promise<Anuncio[]> {
    return this.anuncioRepository.find({
      where: {
        statusAnuncio: { idStatusAnuncio: 3 },
      },
      relations: ['statusAnuncio'],
    });
  }

  async consultarAnunciosPorCliente(idCliente: number): Promise<Anuncio[]> {
    return this.anuncioRepository.find({
      where: { anunciante: { idCliente: idCliente } },
      relations: ['statusAnuncio', 'tipoImovel', 'anunciante'],
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
