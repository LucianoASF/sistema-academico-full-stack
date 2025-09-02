import { Joi } from 'celebrate';

export const cursoSchema = Joi.object().keys({
  nome: Joi.string().trim().min(5).max(45).required(),
});
