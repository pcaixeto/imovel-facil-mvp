// src/anunciantes/anunciantes.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Cliente } from 'src/entities/cliente.entity';
import { ClienteService } from 'src/services/cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criarCliente(@Body() cliente: Cliente) {
    return this.clienteService.criarCliente(cliente);
  }
}
