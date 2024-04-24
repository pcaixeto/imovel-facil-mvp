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
      host: "imovelfacil.cf8os0uosfrs.us-east-1.rds.amazonaws.com",
      port: Number("5432"),
      username: "postgres",
      password: "Leite202",
      database: "imovelfacil",
      entities: ["dist/**/*.entity{.ts,.js}"],
      logging: true,
      cache: false,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false
      },
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
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
