import { Joi } from 'celebrate';

export const novaPresencaSchema = Joi.object().keys({
  presente: Joi.boolean().required(),
  matriculaId: Joi.number().integer().required(),
  aulaId: Joi.number().integer().required(),
});

export const updatePresencaSchema = Joi.object().keys({
  presente: Joi.boolean().required(),
});
