import { Joi } from 'celebrate';

export const conectarEDesconectarDisciplina = Joi.object().keys({
  disciplinas: Joi.array().items(Joi.number().integer()),
});
