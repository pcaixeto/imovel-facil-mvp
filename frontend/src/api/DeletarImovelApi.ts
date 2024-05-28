// src/api/DeletarImovelApi.js

import { ImovelResponse } from '../interfaces/ImovelResponse';
import { API_BASE_URL } from './ApiBaseUrlConstant';

export async function deletarImovelApi(idImovel: number): Promise<ImovelResponse> {
  const response = await fetch(`${API_BASE_URL}/imovel/delete/${idImovel}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to delete property: ${message}`);
  }
  return await response.json();
}
