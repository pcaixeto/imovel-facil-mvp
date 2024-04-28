/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnuncioController } from './controllers/anuncio.controller';
import { Anuncio } from './entities/anuncio.entity';
import { Imovel } from './entities/imovel.entity';
import { TipoImovel } from './entities/tipo.imovel.entity';
import { AnuncioService } from './services/anuncio.service';
import { AnuncioImovelController } from './controllers/anuncia.imovel.controller';
import { AnunciaImovelService } from './services/anunciaImovel.service';
import { ImovelController } from './controllers/imovel.controller';
import { ImovelService } from './services/imovel.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "187.182.45.104",
      port: Number("5432"),
      username: "postgres",
      password: "example",
      database: "postgres",
      entities: ["dist/**/*.entity{.ts,.js}"],
      logging: true,
      cache: false
    }),
    TypeOrmModule.forFeature([Anuncio, Imovel, TipoImovel]),
  ],
  controllers: [
    AnuncioController,
    ImovelController,
    AnuncioImovelController
  ],
  providers: [
    AnuncioService,
    ImovelService,
    AnunciaImovelService
  ],
})
export class AppModule {}
