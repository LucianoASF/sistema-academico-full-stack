import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // sua URL base
  withCredentials: true, // se precisar enviar cookies
});

export default api;
