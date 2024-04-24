// src/anuncios/anuncios.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anuncio } from 'src/entities/anuncio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnuncioService {
  constructor(
    @InjectRepository(Anuncio)
    private anuncioRepository: Repository<Anuncio>,
  ) {}

  async criarAnuncio(anuncio: Anuncio): Promise<Anuncio> {
    console.log('Log do Service');
    console.log(anuncio);
    return this.anuncioRepository.save(anuncio);
  }

  async consultaTodosAnuncios(): Promise<Anuncio[]> {
    return this.anuncioRepository.find();
  }
}
