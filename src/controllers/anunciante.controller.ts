// src/anunciantes/anunciantes.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Anunciante } from 'src/entities/anunciante.entity';
import { AnunciantesService } from 'src/services/anunciante.service';

@Controller('anunciantes')
export class AnunciantesController {
  constructor(private readonly anunciantesService: AnunciantesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criarAnunciante(@Body() anunciante: Anunciante) {
    return this.anunciantesService.criarAnunciante(anunciante);
  }
}
