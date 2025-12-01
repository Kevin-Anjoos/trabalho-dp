import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function addToCarrinho(produtoId, quantidade = 1) {
  return api.post('/carrinho', { produtoId, quantidade });
}

export async function getCarrinho() {
  return api.get('/carrinho');
}

export async function checkout() {
  return api.post('/checkout');
}

export async function sendContato(contato) {
  // contato: { nome, email, mensagem }
  return api.post('/contato', contato);
}

export async function login(credentials) {
  // credentials: { email, senha }
  return api.post('/login', credentials);
}

export default api;
