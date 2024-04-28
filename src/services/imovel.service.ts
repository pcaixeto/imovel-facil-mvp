import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Imovel } from 'src/entities/imovel.entity';
import { Repository } from 'typeorm';
import { InfoAnuncioDto } from 'src/dto/infoAnuncio.dto';
import { infoAnuncioDtoToImovelMapper } from 'src/mapper/dtoToEntity.mapper';

@Injectable()
export class ImovelService {
  constructor(
    @InjectRepository(Imovel)
    private imovelRepository: Repository<Imovel>,
  ) {}

  async criarImovelTeste(imovel: Imovel): Promise<Imovel> {
    return this.imovelRepository.save(imovel);
  }

  async criarImovel(infoAnuncioDto: InfoAnuncioDto): Promise<Imovel> {
    console.log('infoAnuncioDto: ');
    console.log(infoAnuncioDto);

    const imovel = infoAnuncioDtoToImovelMapper(infoAnuncioDto);
    return this.imovelRepository.save(imovel);
  }
}
