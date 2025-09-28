import { Joi } from 'celebrate';

export const disciplinaRealizadaSchema = Joi.object().keys({
  dataInicio: Joi.date().required(),
  dataFim: Joi.date(),
  disciplinaId: Joi.number().integer().required(),
  professorId: Joi.number().integer().required(),
});
