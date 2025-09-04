import { Router } from 'express';
import { MatriculaController } from '../controllers/matricula.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import {
  novaMatriculaSchema,
  updateMatriculaSchema,
} from '../schemas/matricula.schema.js';

export const matriculaRoutes = Router();

matriculaRoutes.post(
  '/matriculas',
  celebrate({ [Segments.BODY]: novaMatriculaSchema }),
  asyncHandler(MatriculaController.create),
);
matriculaRoutes.get(
  '/matriculas/disciplinas-realizadas/:disciplinaRealizadaId',
  asyncHandler(MatriculaController.getAllByDisciplinaRealizada),
);
matriculaRoutes.get(
  '/matriculas/:id',
  asyncHandler(MatriculaController.getById),
);
matriculaRoutes.delete(
  '/matriculas/:id',
  asyncHandler(MatriculaController.delete),
);
matriculaRoutes.patch(
  '/matriculas/:id',
  celebrate({ [Segments.BODY]: updateMatriculaSchema }),
  asyncHandler(MatriculaController.update),
);
