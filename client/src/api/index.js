import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const fetchProfiles = async () => {
  const response = await api.get('/generate-token');
  return response.data;
};

export const fetchProducts = async () => {
  const response = await api.get('/generate-product');
  return response.data;
};

export const createOrder = async (orderData, token) => {
  const response = await api.post('/api/orders', orderData, {
    headers: { Authorization: `${token}` }
  });
  return response.data;
};

export const fetchTransactions = async (token) => {
  const response = await api.get('/api/trnsc', {
    headers: { Authorization: `${token}` }
  });
  return response.data;
};
