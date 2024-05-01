// src/EditarAnuncio.ts
import { Anuncio } from '../../../backend/src/entities/anuncio.entity'
import { AnuncioResponse } from '../interfaces/AnuncioResponse';

const API_BASE_URL = 'http://localhost:3001'; // URL do backend

export async function editarAnuncio(id:number, anuncioDto: AnuncioResponse): Promise<Anuncio> {
  const response = await fetch(`${API_BASE_URL}/editar/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(anuncioDto),
  });
  console.log('Resposta da requisição:', response);
  if (!response.ok) {
    throw new Error('Falha ao atualizar anúncio');
  }
  return await response.json();
}
