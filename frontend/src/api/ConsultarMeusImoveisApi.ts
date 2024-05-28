// src/api/ConsultarMeusImoveisApi.js

import { ImovelResponse } from '../interfaces/ImovelResponse';
import { API_BASE_URL } from './ApiBaseUrlConstant';

export async function consultarMeusImoveisApi(idCliente: number): Promise<ImovelResponse[]> {
  const response = await fetch(`${API_BASE_URL}/imovel/meus-imoveis?idCliente=${idCliente}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!response.ok) {
    throw new Error('Falha ao consultar imóveis');
  }
  return await response.json();
}
