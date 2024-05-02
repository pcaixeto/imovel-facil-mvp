// src/api/AtualizarStatusAnuncioApi.ts
import { AnuncioResponse } from '../interfaces/AnuncioResponse';
import { API_BASE_URL } from './ApiBaseUrlConstant';

export async function atualizarStatusAnuncioApi(anuncioId: number, statusId: number): Promise<AnuncioResponse> {
  const response = await fetch(`${API_BASE_URL}/anuncio/reservar/${anuncioId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ statusId }),
  });

  if (!response.ok) {
    throw new Error('Falha ao atualizar o status do anúncio.');
  }

  return await response.json();
}