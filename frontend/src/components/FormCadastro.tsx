import { Controller, useForm } from 'react-hook-form';
import BotaoPrincipal from './BotaoPrincipal';
import Input from './Input';
import ErrorMessage from './ErrorMessage';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import { useEffect, useMemo } from 'react';

// Função que cria o schema conforme se há dadosDoUsuario
const criarSchemaCadastro = (temDados: boolean) => {
  // Campos comuns a ambos os casos
  const baseSchema = {
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
    senha: temDados
      ? // Atualização → senha opcional
        z
          .string()
          .refine(
            (val) => val === '' || (val.length >= 5 && val.length <= 60),
            { message: 'A senha deve ter entre 5 e 60 caracteres.' },
          )
          .optional()
      : // Criação → senha obrigatória
        z
          .string()
          .min(5, 'A senha deve ter pelo menos 5 caracteres')
          .max(60, 'A senha deve ter no máximo 60 caracteres'),
    role: temDados
      ? z.enum(['administrador', 'professor', 'aluno']).optional()
      : z.enum(
          ['administrador', 'professor', 'aluno'],
          'O campo tem que ser administrador, professor ou aluno',
        ),
  };

  // Se for edição, não inclui o campo `role`
  return z.object(baseSchema);
};

export type CadastroFormInputs = z.infer<
  ReturnType<typeof criarSchemaCadastro>
>;

interface FormularioCadastroProps {
  onSubmit: (data: CadastroFormInputs) => Promise<void>;
  submitLabel: string;
  dadosDoUsuario?: CadastroFormInputs;
}

const FormCadastro = ({
  onSubmit,
  submitLabel,
  dadosDoUsuario,
}: FormularioCadastroProps) => {
  // Cria o schema com base em ter (ou não) dadosDoUsuario
  const schema = useMemo(
    () => criarSchemaCadastro(!!dadosDoUsuario),
    [dadosDoUsuario],
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CadastroFormInputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (dadosDoUsuario) {
      reset({
        nome: dadosDoUsuario.nome,
        cpf: dadosDoUsuario.cpf,
        dataNascimento: dadosDoUsuario.dataNascimento,
        email: dadosDoUsuario.email,
        telefone: dadosDoUsuario.telefone,
        senha: '',
      });
    }
  }, [dadosDoUsuario, reset]);

  return (
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
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
            label={`Senha ${dadosDoUsuario ? '(opcional)' : '(obrigatória)'}`}
            type="password"
            {...register('senha')}
          />
          {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
        </div>
      </div>
      {!dadosDoUsuario && (
        <>
          <label htmlFor="role">Tipo de usuário</label>
          <select
            id="role"
            className="w-full border border-gray-700 p-2 rounded-md"
            {...register('role')}
          >
            <option value="">Selecione...</option>
            <option value="administrador">Administrador</option>
            <option value="professor">Professor</option>
            <option value="aluno">Aluno</option>
          </select>
          {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
        </>
      )}

      <div className="flex justify-end pt-6">
        <BotaoPrincipal disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : submitLabel}
        </BotaoPrincipal>
      </div>
    </form>
  );
};

export default FormCadastro;
