// AutenticacaoService.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class AutenticacaoService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async validarUsuario(
    email: string,
    password: string,
    tipoCliente: number,
  ): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.findOne({
      where: { emailCliente: email, passwordCliente: password },
      relations: ['tipoCliente'],
    });
    if (cliente && cliente.tipoCliente.idTipoCliente === tipoCliente) {
      return cliente;
    }
    return null;
  }

  async login(
    email: string,
    password: string,
    tipoCliente: number,
  ): Promise<Cliente> {
    const cliente = await this.validarUsuario(email, password, tipoCliente);
    if (!cliente) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return cliente;
  }
}
