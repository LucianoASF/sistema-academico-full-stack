import { Router } from 'express';
import { GradeController } from '../controllers/grade.controller.js';
import asyncHandler from 'express-async-handler';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware.js';

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
