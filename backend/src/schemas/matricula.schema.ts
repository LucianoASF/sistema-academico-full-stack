import { Joi } from 'celebrate';

export const novaMatriculaSchema = Joi.object().keys({
  alunoId: Joi.number().integer().required(),
  disciplinaRealizadaId: Joi.number().integer().required(),
});

export const updateMatriculaSchema = Joi.object().keys({
  notaFinal: Joi.number().integer().min(0).max(100),
  presencaFinal: Joi.number().integer(),
});
