// src/api.js
import { Anuncio } from '../../../backend/src/entities/anuncio.entity'
import { AnuncioResponse } from '../interfaces/AnuncioResponse';

const API_BASE_URL = 'http://localhost:3001'; // URL do backend

export async function consultarAnunciosApi(): Promise<AnuncioResponse[]> {
  const response = await fetch(`${API_BASE_URL}/anuncio`, {
    method: 'GET', //remover?
  });
  if (!response.ok) {
    throw new Error('Falha ao criar anúncio');
  }
  return await response.json();
}

//ATUALMENTE, ESTOU PEGANDO TODOS OS ANUNCIOS DO BANCO DE DADOS, FILTRAR APENAS POR RESERVADOS