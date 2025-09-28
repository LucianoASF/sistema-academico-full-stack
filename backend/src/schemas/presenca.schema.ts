import { Joi } from 'celebrate';

export const novaPresencaSchema = Joi.array().items(
  Joi.object({
    presente: Joi.boolean().required(),
    matriculaId: Joi.number().integer().required(),
  }),
);

export const updatePresencaSchema = Joi.array().items(
  Joi.object({
    presente: Joi.boolean().required(),
  }),
);
