import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const shortenUrl = async (url) => {
  const response = await api.post('/api/url/shorten', { url });
  return response.data;
};

export const getUrlList = async () => {
  const response = await api.get('/api/url/list');
  return response.data;
};

export const getAnalytics = async () => {
  const response = await api.get('/api/url/analytics');
  return response.data;
};

export default api;
