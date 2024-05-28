// src/api/ConsultarMeusAnunciosApi.ts
import { API_BASE_URL } from './ApiBaseUrlConstant';
import { AnuncioResponse } from '../interfaces/AnuncioResponse';

export const consultarMeusAnunciosApi = async (idCliente: number): Promise<AnuncioResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/anuncio/meus-anuncios?idCliente=${idCliente}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Falha ao buscar meus anúncios');
  }

  return await response.json();
}
