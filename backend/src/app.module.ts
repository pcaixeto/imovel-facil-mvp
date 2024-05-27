/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnuncioController } from './controllers/anuncio.controller';
import { ClienteController } from './controllers/cliente.controller';
import { Anuncio } from './entities/anuncio.entity';
import { TipoImovel } from './entities/tipoImovel.entity';
import { AnuncioService } from './services/anuncio.service';
import { ClienteService } from './services/cliente.service';
import { StatusAnuncio } from './entities/statusAnuncio.entity';
import { Cliente } from './entities/cliente.entity';
import { AutenticacaoController } from './controllers/autenticacao.controller';
import { AutenticacaoService } from './services/autenticacao.service';

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
    TypeOrmModule.forFeature([Cliente, Anuncio, StatusAnuncio, TipoImovel]),
  ],
  controllers: [
    AnuncioController,
    ClienteController,
    AutenticacaoController
    // AnuncioImovelController
  ],
  providers: [
    AnuncioService,
    ClienteService,
    AutenticacaoService
    // AnunciaImovelService
  ],
})
export class AppModule {}
