/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnuncioController } from './controllers/anuncio.controller';
import { AnunciantesController } from './controllers/anunciante.controller';
import { Anuncio } from './entities/anuncio.entity';
import { TipoImovel } from './entities/tipoImovel.entity';
import { AnuncioService } from './services/anuncio.service';
import { AnunciantesService } from './services/anunciante.service';
import { StatusAnuncio } from './entities/statusAnuncio.entity';
import { Anunciante } from './entities/anunciante.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "192.168.100.103",
      port: Number("5432"),
      username: "postgres",
      password: "example",
      database: "postgres",
      entities: ["dist/**/*.entity{.ts,.js}"],
      logging: true,
      cache: false
    }),
    TypeOrmModule.forFeature([Anunciante, Anuncio, StatusAnuncio, TipoImovel]),
  ],
  controllers: [
    AnuncioController,
    AnunciantesController
    // AnuncioImovelController
  ],
  providers: [
    AnuncioService,
    AnunciantesService
    // AnunciaImovelService
  ],
})
export class AppModule {}
