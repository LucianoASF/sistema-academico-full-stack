import { Joi } from 'celebrate';

export const novaNotaSchema = Joi.array().items(
  Joi.object({
    valorObtido: Joi.number().required(),
    matriculaId: Joi.number().integer().required(),
  }),
);

export const updateNotaSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().integer().required(),
    valorObtido: Joi.number().required(),
  }),
);
