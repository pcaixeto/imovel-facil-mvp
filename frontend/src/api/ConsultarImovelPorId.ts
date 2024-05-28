// src/api/ConsultarImovelPorIdApi.ts

import { ImovelResponse } from '../interfaces/ImovelResponse';
import { API_BASE_URL } from './ApiBaseUrlConstant';

export async function consultarImovelPorIdApi(id: number): Promise<ImovelResponse> {
  const response = await fetch(`${API_BASE_URL}/imovel/consultaPorId/${id}`, {
    method: 'GET'
  });
  if (!response.ok) {
    throw new Error('Falha ao consultar imóvel');
  }
  return await response.json();
}
