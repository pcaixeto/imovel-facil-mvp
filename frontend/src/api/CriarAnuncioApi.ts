// src/api.js
import { Anuncio } from '../../../backend/src/entities/anuncio.entity'
import { AnuncioDTO } from '../../../backend/src/dto/AnuncioDTO.dto';
import { API_BASE_URL } from './ApiBaseUrlConstant';

export async function criarAnuncioApi(anuncioDto: AnuncioDTO): Promise<Anuncio> {
  const response = await fetch(`${API_BASE_URL}/anuncio/criar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(anuncioDto),
  });
  if (!response.ok) {
    throw new Error('Falha ao criar anúncio');
  }
  return await response.json();
}
