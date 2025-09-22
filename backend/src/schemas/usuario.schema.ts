import { Joi } from 'celebrate';
import { brasilPhoneRegex } from '../utils/regex.js';

export const novoUsuarioSchema = Joi.object().keys({
  nome: Joi.string().trim().min(5).max(100).required(),
  email: Joi.string().trim().email().min(5).max(100).required(),
  telefone: Joi.string().trim().regex(brasilPhoneRegex).length(11).required(),
  cpf: Joi.string().trim().length(11).required(),
  dataNascimento: Joi.date().required(),
  senha: Joi.string().trim().min(5).max(60).required(),
  role: Joi.string()
    .trim()
    .valid('aluno', 'professor', 'administrador')
    .required(),
});
export const updateUsuarioSchema = Joi.object().keys({
  nome: Joi.string().trim().min(5).max(100).required(),
  email: Joi.string().trim().email().min(5).max(100).required(),
  telefone: Joi.string().trim().regex(brasilPhoneRegex).length(11).required(),
  cpf: Joi.string().trim().length(11).required(),
  dataNascimento: Joi.date().required(),
  senha: Joi.string().trim().min(5).max(60),
});
