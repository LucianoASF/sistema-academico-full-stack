import { Router } from 'express';
import { DisciplinaController } from '../controllers/disciplina.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import {
  conectarGradeSchema,
  disciplinaSchema,
} from '../schemas/disciplina.schema.js';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware.js';

export const disciplinaRoutes = Router();

disciplinaRoutes.post(
  '/disciplinas',
  celebrate({ [Segments.BODY]: disciplinaSchema }),
  asyncHandler(DisciplinaController.create),
);
disciplinaRoutes.get(
  '/disciplinas',
  AuthorizationMiddleware('administrador'),
  asyncHandler(DisciplinaController.getAll),
);
disciplinaRoutes.get(
  '/disciplinas/:id',
  asyncHandler(DisciplinaController.getById),
);
disciplinaRoutes.delete(
  '/disciplinas/:id',
  AuthorizationMiddleware('administrador'),
  asyncHandler(DisciplinaController.delete),
);
disciplinaRoutes.patch(
  '/disciplinas/:id/grades',
  celebrate({ [Segments.BODY]: conectarGradeSchema }),
  asyncHandler(DisciplinaController.conectarDisciplinaComGrade),
);
disciplinaRoutes.delete(
  '/disciplinas/:id/grades/:gradeId',
  asyncHandler(DisciplinaController.desconectarDisciplinaComGrade),
);
