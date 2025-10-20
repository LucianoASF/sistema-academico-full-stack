import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { CadastroFormInputs } from '../components/FormCadastro';
import api from '../api/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import TituloPrincipal from '../components/TituloPrincipal';
import FormCadastro from '../components/FormCadastro';
import { stringToDate } from '../utils/ConverteStringEmDate';

const EditarUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState<CadastroFormInputs>();
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const dados = (await api.get<CadastroFormInputs>(`/usuarios/${id}`))
          .data;
        dados.dataNascimento = dados.dataNascimento.split('T')[0];
        setUsuario(dados);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchUsuario();
  }, [id]);

  async function onSubmit(data: CadastroFormInputs) {
    const dataNascimento = stringToDate(data.dataNascimento);
    try {
      if (data.senha) {
        await api.patch(`/usuarios/${id}`, {
          ...data,
          dataNascimento,
        });
      } else {
        const dados = { ...data };
        delete dados.senha;
        await api.patch(`/usuarios/${id}`, {
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

export default EditarUsuario;
