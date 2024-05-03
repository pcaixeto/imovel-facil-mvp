// src/api.js
import { AnuncioResponse } from '../interfaces/AnuncioResponse';
import { API_BASE_URL } from './ApiBaseUrlConstant';

export async function consultarTodosAnuncios(): Promise<AnuncioResponse[]> {
  const response = await fetch(`${API_BASE_URL}/anuncio`, {
    method: 'GET', //remover?
  });
  if (!response.ok) {
    throw new Error('Falha ao criar anúncio');
  }
  return await response.json();
}

//ATUALMENTE, ESTOU PEGANDO TODOS OS ANUNCIOS DO BANCO DE DADOS, FILTRAR APENAS POR RESERVADOS