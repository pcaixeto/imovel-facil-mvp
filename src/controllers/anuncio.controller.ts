// src/anuncios/anuncios.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Put,
} from '@nestjs/common';
import { UpdateAnuncioDto } from 'src/dto/updateAnuncio.dto';
import { Anuncio } from 'src/entities/anuncio.entity';
import { AnuncioService } from 'src/services/anuncio.service';

@Controller('anuncio')
export class AnuncioController {
  constructor(private anunciosService: AnuncioService) {}

  @Post('teste')
  @HttpCode(HttpStatus.CREATED)
  async criarAnuncioTeste(@Body() anuncio: Anuncio) {
    console.log('Log do Controller');
    console.log(anuncio);
    return this.anunciosService.criarAnuncioTeste(anuncio);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async consultarAnuncios() {
    return this.anunciosService.consultaAnuncios();
  }

  @Put('editar')
  @HttpCode(HttpStatus.OK)
  async editarAnuncio(@Body() updateAnuncioDto: UpdateAnuncioDto) {
    return this.anunciosService.editarAnuncio(updateAnuncioDto);
  }
}
