/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnuncioController } from './controllers/anuncio.controller';
import { Anuncio } from './entities/anuncio.entity';
import { AnuncioService } from './services/anuncio.service';

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
    TypeOrmModule.forFeature([Anuncio]),
  ],
  controllers: [
    AppController,
    AnuncioController,
  ],
  providers: [
    AppService,
    AnuncioService,
  ],
})
export class AppModule {}
