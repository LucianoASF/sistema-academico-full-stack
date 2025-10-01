import { Joi } from 'celebrate';

export const newAvaliacaoSchema = Joi.object().keys({
  nome: Joi.string().trim().min(5).max(60).required(),
  valor: Joi.number().integer().required(),
  data: Joi.date().required(),
});
export const updateAvaliacaoSchema = Joi.object().keys({
  nome: Joi.string().trim().min(5).max(60).required(),
  valor: Joi.number().integer().required(),
  data: Joi.date().required(),
  disciplinaRealizadaId: Joi.number().integer().required(),
});
