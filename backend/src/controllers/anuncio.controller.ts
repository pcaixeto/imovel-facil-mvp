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
import { AnuncioDTO } from 'src/dto/AnuncioDTO.dto';

@Controller('anuncio')
export class AnuncioController {
  constructor(private anuncioService: AnuncioService) {}

  @Post('criar')
  @HttpCode(HttpStatus.CREATED)
  async criarAnuncio(@Body() anuncioDto: AnuncioDTO) {
    console.log('Log do Controller: ');
    console.log(anuncioDto);
    return this.anuncioService.criarAnuncio(anuncioDto);
  }

  @Put('editar/:id')
  @HttpCode(HttpStatus.OK)
  async editarAnuncio(
    @Param('id') id: number,
    @Body() anuncioEditadoDto: AnuncioEditadoDto,
  ) {
    return this.anuncioService.editarAnuncio(id, anuncioEditadoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async consultarAnuncios() {
    return this.anuncioService.consultaAnuncios();
  }

  @Delete('deletar/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletarAnuncio(@Param('id') id: number) {
    await this.anuncioService.deletarAnuncio(id);
  }
}
