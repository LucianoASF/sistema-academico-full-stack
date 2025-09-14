import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { setNavigate } from './navigateHelper';
import { useAuthContext } from '../contexts/useAuthContext';
import { setSetUser } from './setUserHelper';

const NavigationSetter = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  useEffect(() => {
    setNavigate(navigate); // define a função global para o interceptor
    setSetUser(setUser);
  }, [navigate, setUser]);

  return null; // não precisa renderizar nada
};

export default NavigationSetter;
