import { Joi } from 'celebrate';

export const novaNotaSchema = Joi.object().keys({
  valorObtido: Joi.number().required(),
  matriculaId: Joi.number().integer().required(),
  avaliacaoId: Joi.number().integer().required(),
});

export const updateNotaSchema = Joi.object().keys({
  valorObtido: Joi.number().required(),
});
