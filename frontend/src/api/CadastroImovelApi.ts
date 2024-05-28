// src/api/CadastroImovelApi.js

import { API_BASE_URL } from './ApiBaseUrlConstant';
import { ImovelDTO } from '../../../backend/src/dto/Imovel.dto'; // Ensure the path is correct
import { Imovel } from '../../../backend/src/entities/imovel.entity'; // This import might not be necessary unless used for TypeScript type annotation

export async function cadastroImovelApi(imovelDto: ImovelDTO, idCliente: number): Promise<Imovel> {
  const response = await fetch(`${API_BASE_URL}/imovel/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...imovelDto, clienteId: idCliente }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to register property: ${message}`);
  }

  return await response.json();
}
