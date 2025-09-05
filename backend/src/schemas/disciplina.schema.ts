import { Joi } from 'celebrate';

export const disciplinaSchema = Joi.object().keys({
  nome: Joi.string().trim().min(5).max(45).required(),
  quantidadeAulas: Joi.number().required(),
});

export const conectarGradeSchema = Joi.object().keys({
  gradeId: Joi.number().integer().required(),
});
