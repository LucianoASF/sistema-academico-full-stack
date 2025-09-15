import axios from 'axios';
import { doNavigate } from '../helpers/navigateHelper';
import { doSetUser } from '../helpers/setUserHelper';

const api = axios.create({
  baseURL: 'http://localhost:3000', // sua URL base
  withCredentials: true, // se precisar enviar cookies
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname !== '/login'
    ) {
      // Ação global para 401
      console.log('Usuário não autenticado. Redirecionando para login...');
      doSetUser(null);
      doNavigate('/login');
    }
    return Promise.reject(error);
  },
);

export default api;
