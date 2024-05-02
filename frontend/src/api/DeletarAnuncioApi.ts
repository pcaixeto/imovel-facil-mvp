import { AnuncioResponse } from '../interfaces/AnuncioResponse';

const API_BASE_URL = 'https://ifapi.gabsfrmarqs.boo/'; // URL do backend

export async function deletarAnuncioApi(id: number): Promise<AnuncioResponse> {
  const response = await fetch(`${API_BASE_URL}/anuncio/deletar/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Falha ao deletar o anúncio.');
  }
  return await response.json();
}