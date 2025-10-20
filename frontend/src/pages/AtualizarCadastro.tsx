import TituloPrincipal from '../components/TituloPrincipal';
import { useAuthContext } from '../contexts/useAuthContext';
import { useEffect, useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import { stringToDate } from '../utils/ConverteStringEmDate';
import type { CadastroFormInputs } from '../components/FormCadastro';
import FormCadastro from '../components/FormCadastro';

const AtualizarCadastro = () => {
  const { user } = useAuthContext();
  const [usuario, setUsuario] = useState<CadastroFormInputs>();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const dados = (
          await api.get<CadastroFormInputs>(`/usuarios/${user?.id}`)
        ).data;
        dados.dataNascimento = dados.dataNascimento.split('T')[0];
        setUsuario(dados);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsuario();
  }, [user?.id]);
  async function onSubmit(data: CadastroFormInputs) {
    const dataNascimento = stringToDate(data.dataNascimento);
    try {
      if (data.senha) {
        await api.patch(`/usuarios/${user?.id}`, {
          ...data,
          dataNascimento,
        });
      } else {
        const dados = { ...data };
        delete dados.senha;
        await api.patch(`/usuarios/${user?.id}`, {
          ...dados,
          dataNascimento,
        });
      }
      toast.success('Alterações salvas!');
    } catch (error) {
      if (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    }
  }

  return (
    <main className="flex flex-col p-4 items-center">
      <TituloPrincipal styles="mb-10">Atualizar Cadastro</TituloPrincipal>

      <FormCadastro
        onSubmit={onSubmit}
        submitLabel="Atualizar Cadastro"
        dadosDoUsuario={usuario}
      />
    </main>
  );
};

export default AtualizarCadastro;
