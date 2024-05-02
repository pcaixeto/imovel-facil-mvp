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
  Query,
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

  @Get('buscar')
  @HttpCode(HttpStatus.OK)
  async buscarAnuncios(
    @Query('estado') estado: string,
    @Query('cidade') cidade: string,
    @Query('bairro') bairro: string,
  ): Promise<Anuncio[]> {
    return this.anuncioService.buscarAnuncios(estado, cidade, bairro);
  }

  @Put('editar/:id')
  @HttpCode(HttpStatus.OK)
  async editarAnuncio(
    @Param('id') id: number,
    @Body() anuncioEditadoDto: AnuncioEditadoDto,
  ) {
    return this.anuncioService.editarAnuncio(id, anuncioEditadoDto);
  }

  @Put('reservar/:id')
  async reservarAnuncio(@Param('id') id: number): Promise<Anuncio> {
    const anuncio = await this.anuncioService.atualizarStatusAnuncio(id);
    return anuncio;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async consultarAnuncioPorId(@Param('id') id: number): Promise<Anuncio> {
    console.log('ID do anúncio clicado:', id);
    return this.anuncioService.consultarAnuncioPorId(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async consultarTodosAnuncios() {
    return this.anuncioService.consultaAnuncios();
  }

  @Delete('deletar/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletarAnuncio(@Param('id') id: number) {
    await this.anuncioService.deletarAnuncio(id);
  }
}
