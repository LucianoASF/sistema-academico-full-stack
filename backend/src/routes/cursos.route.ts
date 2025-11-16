import { Router } from 'express';
import { CursoController } from '../controllers/curso.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import { cursoSchema } from '../schemas/curso.schema.js';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware.js';

export const cursoRoutes = Router();

cursoRoutes.post(
  '/cursos',
  celebrate({ [Segments.BODY]: cursoSchema }),
  AuthorizationMiddleware('administrador'),
  asyncHandler(CursoController.create),
);
cursoRoutes.get(
  '/cursos',
  AuthorizationMiddleware('administrador'),
  asyncHandler(CursoController.getAll),
);
cursoRoutes.get(
  '/cursos/:id',
  AuthorizationMiddleware('administrador'),
  asyncHandler(CursoController.getById),
);
cursoRoutes.delete('/cursos/:id', asyncHandler(CursoController.delete));
cursoRoutes.put(
  '/cursos/:id',
  AuthorizationMiddleware('administrador'),
  celebrate({ [Segments.BODY]: cursoSchema }),
  asyncHandler(CursoController.update),
);
