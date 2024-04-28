// src/anuncios/anuncios.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { InfoAnuncioDto } from 'src/dto/infoAnuncio.dto';
import { AnunciaImovelService } from 'src/services/anunciaImovel.service';

@Controller('anunciarImovel')
export class AnuncioImovelController {
  constructor(private anunciaImovelService: AnunciaImovelService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async anunciarImovel(@Body() infoAnuncioDto: InfoAnuncioDto) {
    console.log('Log do Controller');
    console.log(infoAnuncioDto);
    return this.anunciaImovelService.anunciarImovel(infoAnuncioDto);
  }
}
