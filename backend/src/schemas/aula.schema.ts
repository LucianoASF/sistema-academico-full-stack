import { Joi } from 'celebrate';

export const aulaSchema = Joi.object().keys({
  titulo: Joi.string().trim().min(5).max(100).required(),
  descricao: Joi.string().trim().min(10).max(255).required(),
  disciplinaRealizadaId: Joi.number().required(),
});
