import { Joi } from 'celebrate';

export const novoMatriculaCursoSchema = Joi.object().keys({
  dataInicio: Joi.date().required(),
  dataFim: Joi.date(),
  status: Joi.string()
    .valid('cursando', 'finalizado', 'trancado', 'abandonado')
    .required(),
  alunoId: Joi.number().integer().required(),
  gradeId: Joi.number().integer().required(),
});

export const updateMatriculaCursoSchema = Joi.object().keys({
  dataInicio: Joi.date().required(),
  dataFim: Joi.date(),
  status: Joi.string()
    .valid('cursando', 'finalizado', 'trancado', 'abandonado')
    .required(),
});
