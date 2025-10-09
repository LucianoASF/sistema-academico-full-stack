import { Controller, useForm } from 'react-hook-form';
import BotaoPrincipal from '../components/BotaoPrincipal';
import Input from '../components/Input';
import TituloPrincipal from '../components/TituloPrincipal';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import ErrorMessage from '../components/ErrorMessage';
import { useAuthContext } from '../contexts/useAuthContext';
import { useEffect } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import { stringToDate } from '../utils/ConverteStringEmDate';

const atualizarCadastroSchema = z.object({
  nome: z
    .string()
    .min(5, 'Nome deve ter pelo menos 5 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z
    .string()
    .email('Email inválido')
    .min(5, 'Email deve ter pelo menos 5 caracteres')
    .max(100, 'Email deve ter no máximo 100 caracteres'),
  telefone: z.string().length(11, 'O telefone deve ter 11 números'),
  cpf: z.string().length(11, 'O CPF deve ter 11 números'),
  dataNascimento: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Data inválida',
  }),
  senha: z
    .string()
    // A validação personalizada que permite "" ou passa para a validação min/max
    .refine((val) => val === '' || (val.length >= 5 && val.length <= 60), {
      message: 'A senha deve ter entre 5 e 60 caracteres.',
    })
    .optional(),
});
type CadastroFormInputs = z.infer<typeof atualizarCadastroSchema>;

const AtualizarCadastro = () => {
  const { user } = useAuthContext();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormInputs>({
    resolver: zodResolver(atualizarCadastroSchema),
    mode: 'onChange',
  });
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const dados = (
          await api.get<CadastroFormInputs>(`/usuarios/${user?.id}`)
        ).data;
        setValue('nome', dados.nome);
        setValue('email', dados.email);
        setValue('cpf', dados.cpf);
        setValue('telefone', dados.telefone);
        setValue('dataNascimento', dados.dataNascimento.split('T')[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsuario();
  }, [user?.id, setValue]);
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
      <TituloPrincipal styles="mb-16">Atualizar Cadastro</TituloPrincipal>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input label="Nome" {...register('nome')} />
            {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
          </div>

          <div>
            <Input label="Email" type="email" {...register('email')} />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div>
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <PatternFormat
                  value={field.value || ''}
                  format="###.###.###-##"
                  customInput={Input}
                  mask="_"
                  onValueChange={(values) => field.onChange(values.value)}
                  label="CPF"
                />
              )}
            />
            {errors.cpf && <ErrorMessage>{errors.cpf.message}</ErrorMessage>}
          </div>

          <div>
            <Controller
              name="telefone"
              control={control}
              render={({ field }) => (
                <PatternFormat
                  value={field.value || ''}
                  format="(##) #####-####"
                  customInput={Input}
                  mask="_"
                  onValueChange={(values) => field.onChange(values.value)}
                  label="Telefone"
                />
              )}
            />
            {errors.telefone && (
              <ErrorMessage>{errors.telefone.message}</ErrorMessage>
            )}
          </div>

          <div>
            <Input
              label="Data de Nascimento"
              type="date"
              {...register('dataNascimento')}
            />
            {errors.dataNascimento && (
              <ErrorMessage>{errors.dataNascimento.message}</ErrorMessage>
            )}
          </div>
          <div>
            <Input
              label="Senha (opcional)"
              type="password"
              {...register('senha')}
            />
            {errors.senha && (
              <ErrorMessage>{errors.senha.message}</ErrorMessage>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <BotaoPrincipal>
            {isSubmitting ? 'Enviando...' : 'Salvar Alterações'}
          </BotaoPrincipal>
        </div>
      </form>
    </main>
  );
};

export default AtualizarCadastro;
