import { API_BASE_URL } from './ApiBaseUrlConstant';

export async function criarClienteApi(cliente: any) {
  const response = await fetch(`${API_BASE_URL}/cliente`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  });
  if (!response.ok) {
    throw new Error('Falha ao criar estudante');
  }
  return await response.json();
}
