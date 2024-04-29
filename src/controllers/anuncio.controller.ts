// src/anuncios/anuncios.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Anuncio } from 'src/entities/anuncio.entity';
import { AnuncioService } from 'src/services/anuncio.service';
import { AnuncioEditadoDto } from 'src/dto/anuncioEditado.dto';

@Controller('anuncio')
export class AnuncioController {
  constructor(private anunciosService: AnuncioService) {}

  @Post('criar')
  @HttpCode(HttpStatus.CREATED)
  async criarAnuncio(@Body() anuncio: Anuncio) {
    console.log('Log do Controller: ');
    console.log(anuncio);
    return this.anunciosService.criarAnuncio(anuncio);
  }

  @Put('editar/:id')
  @HttpCode(HttpStatus.OK)
  async editarAnuncio(
    @Param('id') id: number,
    @Body() anuncioEditadoDto: AnuncioEditadoDto,
  ) {
    return this.anunciosService.editarAnuncio(id, anuncioEditadoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async consultarAnuncios() {
    return this.anunciosService.consultaAnuncios();
  }

  @Delete('deletar/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletarAnuncio(@Param('id') id: number) {
    await this.anunciosService.deletarAnuncio(id);
  }
}
