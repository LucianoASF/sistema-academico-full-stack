import { toast } from 'react-toastify';
import api from '../api/api';
import FormCadastro, {
  type CadastroFormInputs,
} from '../components/FormCadastro';
import TituloPrincipal from '../components/TituloPrincipal';
import { stringToDate } from '../utils/ConverteStringEmDate';
import axios from 'axios';
import { useState } from 'react';

const CriarUsuario = () => {
  const [formKey, setFormKey] = useState(0);
  async function onSubmit(data: CadastroFormInputs) {
    const dataNascimento = stringToDate(data.dataNascimento);
    try {
      await api.post(`/usuarios`, {
        ...data,
        dataNascimento,
      });
      toast.success('Usuário criado!');
      setFormKey((prev) => prev + 1);
    } catch (error) {
      if (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    }
  }
  return (
    <main className="flex flex-col p-4 items-center">
      <TituloPrincipal styles="mb-10">Cadastro de Usuário</TituloPrincipal>

      <FormCadastro
        key={formKey}
        onSubmit={onSubmit}
        submitLabel="Cadastrar usuário"
      />
    </main>
  );
};

export default CriarUsuario;
