import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ImovelService } from '../services/imovel.service';
import { ImovelDTO } from 'src/dto/Imovel.dto';
import { Imovel } from 'src/entities/imovel.entity';

@Controller('imovel')
export class ImovelController {
  constructor(private readonly imovelService: ImovelService) {}

  @Post('cadastro')
  @HttpCode(HttpStatus.CREATED)
  async cadastroImovel(@Body() imovelDto: ImovelDTO) {
    return this.imovelService.cadastroImovel(imovelDto);
  }

  @Get('consultaPorId/:id')
  async consultarImovelPorId(@Param('id') id: number): Promise<Imovel> {
    const imovel = await this.imovelService.consultarImovelPorId(id);
    return imovel;
  }
}
