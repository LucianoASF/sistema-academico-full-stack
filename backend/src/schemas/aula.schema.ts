import { Joi } from 'celebrate';

export const newAulaSchema = Joi.object().keys({
  titulo: Joi.string().trim().min(5).max(100).required(),
  descricao: Joi.string().trim().min(10).max(255).required(),
  data: Joi.date().required(),
});
export const updateAulaSchema = Joi.object().keys({
  titulo: Joi.string().trim().min(5).max(100).required(),
  descricao: Joi.string().trim().min(10).max(255).required(),
  data: Joi.date().required(),
  disciplinaRealizadaId: Joi.number().integer().required(),
});
