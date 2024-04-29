// // src/anuncios/anuncios.controller.ts
// import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
// import { AnunciaImovelService } from 'src/services/anunciaImovel.service';

// @Controller('anunciarImovel')
// export class AnuncioImovelController {
//   constructor(private anunciaImovelService: AnunciaImovelService) {}

//   @Post()
//   @HttpCode(HttpStatus.CREATED)
//   async anunciarImovel(@Body() anuncio: Anuncio) {
//     console.log('Log do Controller');
//     console.log(anuncio);
//     return this.anunciaImovelService.anunciarImovel(infoAnuncioDto);
//   }
// }
