// src/imoveis/imoveis.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Imovel } from 'src/entities/imovel.entity';
import { ImovelService } from 'src/services/imovel.service';

@Controller('imoveis')
export class ImovelController {
  constructor(private imovelService: ImovelService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criarImovelTeste(@Body() imovel: Imovel) {
    console.log('Log do Controller: Criando Imóvel');
    console.log(imovel);
    return this.imovelService.criarImovelTeste(imovel);
  }
}
