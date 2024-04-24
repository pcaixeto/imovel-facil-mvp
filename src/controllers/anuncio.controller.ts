// src/anuncios/anuncios.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { Anuncio } from 'src/entities/anuncio.entity';
import { AnuncioService } from 'src/services/anuncio.service';

@Controller('anuncios')
export class AnuncioController {
  constructor(private anunciosService: AnuncioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criarAnuncio(@Body() anuncio: Anuncio) {
    console.log('Log do Controller');
    console.log(anuncio);
    return this.anunciosService.criarAnuncio(anuncio);
  }

  @Get()
  async consultaTodosAnuncios() {
    return this.anunciosService.consultaTodosAnuncios();
  }
}
