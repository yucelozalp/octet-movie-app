import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5009/',
});

export default api;