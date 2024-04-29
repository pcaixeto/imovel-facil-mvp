// src/anunciantes/anunciantes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anunciante } from 'src/entities/anunciante.entity';

@Injectable()
export class AnunciantesService {
  constructor(
    @InjectRepository(Anunciante)
    private anunciantesRepository: Repository<Anunciante>,
  ) {}

  // async createAnunciante(
  //   nomeAnunciante: string,
  //   emailAnunciante: string,
  //   password: string,
  // ): Promise<Anunciante> {
  //   const novoAnunciante = this.anunciantesRepository.create({
  //     nomeAnunciante,
  //     emailAnunciante,
  //     password,
  //   });

  //   return this.anunciantesRepository.save(novoAnunciante);
  // }

  async criarAnunciante(anunciante: Anunciante): Promise<Anunciante> {
    return this.anunciantesRepository.save(anunciante);
  }
}
