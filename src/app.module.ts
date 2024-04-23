/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ClientesController } from './controllers/clientes.controller';
// import { ClientesService } from './services/clientes.service';
// import { ContasController } from './controllers/contas.controller';
// import { ContasService } from './services/contas.service';
// import { MovimentacoesController } from './controllers/movimentacoes.controller';
// import { MovimentacoesService } from './services/movimentacoes.service';
import { Cliente } from './temp-delete/cliente.entity';
import { Conta } from './temp-delete/conta.entity';
import { Movimentacao } from './temp-delete/movimentacao.entity';
import { Teste } from './entities/teste.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "imovelfacil.cf8os0uosfrs.us-east-1.rds.amazonaws.com",
      port: Number("5432"),
      username: "postgres",
      password: "Leite202",
      database: "postgres",
      entities: [Teste],
      cache: false,
      ssl: {
        rejectUnauthorized: false
      },
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
    TypeOrmModule.forFeature([Teste]),
  ],
  controllers: [
    AppController,
    // ClientesController,
    // ContasController,
    // MovimentacoesController,
  ],
  providers: [
    AppService
  //   ClientesService,
  //   ContasService,
  //   MovimentacoesService,
  ],
})
export class AppModule {}
