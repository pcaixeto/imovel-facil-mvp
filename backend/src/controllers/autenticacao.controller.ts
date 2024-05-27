// AutenticacaoController.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Cliente } from '../entities/cliente.entity';

@Controller('auth')
export class AutenticacaoController {
  constructor(private AutenticacaoService: AutenticacaoService) {}

  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string; tipoCliente: number },
  ): Promise<Cliente> {
    const { email, password, tipoCliente } = loginDto;
    const cliente = await this.AutenticacaoService.login(
      email,
      password,
      tipoCliente,
    );
    if (!cliente) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return cliente;
  }
}
