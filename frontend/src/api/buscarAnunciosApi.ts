import { Anuncio } from "../../../backend/src/entities/anuncio.entity"; 
import { BuscaAnuncioFilter } from "../interfaces/BuscaAnuncioFiltro";

const API_BASE_URL = 'http://localhost:3001'; // URL do backend

export async function buscarAnunciosApi(buscaAnuncioFilter: BuscaAnuncioFilter): Promise<Anuncio[]> {
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