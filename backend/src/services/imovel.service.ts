import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imovel } from '../entities/imovel.entity';
import { ImovelDTO } from 'src/dto/Imovel.dto';
import { Cliente } from 'src/entities/cliente.entity';
import { TipoImovel } from 'src/entities/tipoImovel.entity';

@Injectable()
export class ImovelService {
  constructor(
    @InjectRepository(Imovel)
    private readonly imovelRepository: Repository<Imovel>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(TipoImovel)
    private readonly tipoImovelRepository: Repository<TipoImovel>,
  ) {}

  async cadastroImovel(imovelDto: ImovelDTO): Promise<Imovel> {
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente: imovelDto.clienteId },
    });
    const tipoImovel = await this.tipoImovelRepository.findOne({
      where: { idTipoImovel: imovelDto.tipoImovel },
    });

    if (!cliente || !tipoImovel) {
      throw new Error('Cliente ou Tipo de Imóvel não encontrado.');
    }

    const imovel = new Imovel();
    Object.assign(imovel, imovelDto);
    imovel.cliente = cliente;
    imovel.tipoImovel = tipoImovel;

    return this.imovelRepository.save(imovel);
  }

  async consultarImovelPorId(id: number): Promise<Imovel | undefined> {
    return this.imovelRepository.findOne({
      where: { idImovel: id },
      relations: ['cliente', 'tipoImovel'],
    });
  }

  async consultarImoveisPorCliente(idCliente: number) {
    return this.imovelRepository.find({
      where: { cliente: { idCliente: idCliente } },
      relations: ['cliente', 'tipoImovel'],
    });
  }

  async deletarImovel(id: number): Promise<void> {
    const result = await this.imovelRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Imóvel não encontrado ou já foi deletado.');
    }
  }
}
