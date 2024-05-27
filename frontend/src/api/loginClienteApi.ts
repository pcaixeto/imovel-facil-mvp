import { API_BASE_URL } from './ApiBaseUrlConstant';

export const loginApi = async (email: any, password: any, tipoCliente: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, tipoCliente }),
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate');
  }

  return await response.json();
}
