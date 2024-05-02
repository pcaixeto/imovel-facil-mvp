const API_BASE_URL = 'https://ifapi.gabsfrmarqs.boo/'; // Ajuste conforme necessário

export async function consultarAnunciosReservadosApi() {
  const response = await fetch(`${API_BASE_URL}/anuncio/reservados`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Falha ao buscar anúncios reservados');
  }
  return await response.json();
}
