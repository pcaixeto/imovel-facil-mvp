// src/api.js
import { Anuncio } from '../../../backend/src/entities/anuncio.entity'
import { AnuncioDTO } from '../../../backend/src/dto/AnuncioDTO.dto';

const API_BASE_URL = 'http://localhost:3001'; // URL do backend

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
