import { AnuncioResponse } from '../interfaces/AnuncioResponse';
import { API_BASE_URL } from './ApiBaseUrlConstant';

export async function consultarAnuncioPorIdApi(id: number): Promise<AnuncioResponse> {
  const response = await fetch(`${API_BASE_URL}/anuncio/consultaPorId/${id}`, {
    method: 'GET'
  });
  if (!response.ok) {
    throw new Error('Falha ao consultar anúncio');
  }
  return await response.json();
}