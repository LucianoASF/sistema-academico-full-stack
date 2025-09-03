import { Joi } from 'celebrate';

export const aulaSchema = Joi.object().keys({
  descricao: Joi.string().trim().min(5).max(100).required(),
  disciplinaRealizadaId: Joi.number().required(),
});
