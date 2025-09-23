import { Router } from 'express';
import { MatriculaController } from '../controllers/matricula.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import {
  novaMatriculaSchema,
  updateMatriculaSchema,
} from '../schemas/matricula.schema.js';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware.js';

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
  '/matriculas/usuarios/:alunoId',
  AuthorizationMiddleware('aluno'),
  asyncHandler(MatriculaController.getMatriculasByAluno),
);
matriculaRoutes.get(
  '/matriculas/usuarios/:alunoId/cursando',
  AuthorizationMiddleware('aluno'),
  asyncHandler(MatriculaController.getMatriculasCursandoByAluno),
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
