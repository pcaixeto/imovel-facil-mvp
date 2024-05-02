import { BuscaAnuncioFilter } from "../interfaces/BuscaAnuncioFiltro";
import { API_BASE_URL } from './ApiBaseUrlConstant';
import { AnuncioResponse } from '../interfaces/AnuncioResponse';

export async function buscarAnunciosApi(buscaAnuncioFilter: BuscaAnuncioFilter): Promise<AnuncioResponse[]> {
  let url = `${API_BASE_URL}/anuncio/buscar`;
  const params: { [key: string]: string } = {};

  if (buscaAnuncioFilter.estado) {
    params.estado = buscaAnuncioFilter.estado;
  }

  if (buscaAnuncioFilter.cidade) {
    params.cidade = buscaAnuncioFilter.cidade;
  }

  if (buscaAnuncioFilter.bairro) {
    params.bairro = buscaAnuncioFilter.bairro;
  }

  const queryParams = new URLSearchParams(params).toString();
  if (queryParams) {
    url += `?${queryParams}`;
  }

  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Falha ao buscar anúncios');
  }
  
  return await response.json();
}
