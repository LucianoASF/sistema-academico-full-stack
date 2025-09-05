import { Router } from 'express';
import { MatriculaCursoController } from '../controllers/matriculaCurso.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import {
  novoMatriculaCursoSchema,
  updateMatriculaCursoSchema,
} from '../schemas/matriculaCurso.schema.js';

export const matriculaCursoRoutes = Router();

matriculaCursoRoutes.post(
  '/matriculas-cursos',
  celebrate({ [Segments.BODY]: novoMatriculaCursoSchema }),
  asyncHandler(MatriculaCursoController.create),
);
matriculaCursoRoutes.get(
  '/matriculas-cursos/usuarios/:alunoId',
  asyncHandler(MatriculaCursoController.getAllByAluno),
);
matriculaCursoRoutes.get(
  '/matriculas-cursos/cursos/:cursoId',
  asyncHandler(MatriculaCursoController.getAllByCurso),
);
matriculaCursoRoutes.get(
  '/matriculas-cursos/:id',
  asyncHandler(MatriculaCursoController.getById),
);
matriculaCursoRoutes.delete(
  '/matriculas-cursos/:id',
  asyncHandler(MatriculaCursoController.delete),
);
matriculaCursoRoutes.patch(
  '/matriculas-cursos/:id',
  celebrate({ [Segments.BODY]: updateMatriculaCursoSchema }),
  asyncHandler(MatriculaCursoController.update),
);
