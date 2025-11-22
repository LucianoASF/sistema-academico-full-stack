import { Router } from 'express';
import { GradeController } from '../controllers/grade.controller.js';
import asyncHandler from 'express-async-handler';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware.js';
import { celebrate, Segments } from 'celebrate';
import { conectarEDesconectarDisciplina } from '../schemas/grade.schema.js';

export const gradeRoutes = Router();

gradeRoutes.post('/grades/:cursoId', asyncHandler(GradeController.create));
gradeRoutes.get(
  '/grades/:id',
  AuthorizationMiddleware('aluno', 'administrador'),
  asyncHandler(GradeController.getById),
);
gradeRoutes.delete('/grades/:id', asyncHandler(GradeController.delete));
gradeRoutes.get(
  '/grades/cursos/:cursoId',
  AuthorizationMiddleware('administrador'),
  asyncHandler(GradeController.getAllByCurso),
);
gradeRoutes.patch(
  '/grades/:id/disciplinas/adicionar',
  celebrate({ [Segments.BODY]: conectarEDesconectarDisciplina }),
  asyncHandler(GradeController.conectarDisciplinaNaGrade),
);
gradeRoutes.patch(
  '/grades/:id/disciplinas/remover',
  celebrate({ [Segments.BODY]: conectarEDesconectarDisciplina }),
  asyncHandler(GradeController.desconectarDisciplinaNaGrade),
);
