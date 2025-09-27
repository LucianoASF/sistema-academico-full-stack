import { Router } from 'express';
import { AulaController } from '../controllers/aula.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import { aulaSchema } from '../schemas/aula.schema.js';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware.js';

export const aulaRoutes = Router();

aulaRoutes.post(
  '/aulas',
  celebrate({ [Segments.BODY]: aulaSchema }),
  AuthorizationMiddleware('professor', 'administrador'),
  asyncHandler(AulaController.create),
);
aulaRoutes.get(
  '/aulas/disciplinas-realizadas/:disciplinaRealizadaId',
  AuthorizationMiddleware('professor', 'administrador'),
  asyncHandler(AulaController.getAllByDisciplinaEmAndamento),
);
aulaRoutes.get('/aulas/:id', asyncHandler(AulaController.getById));
aulaRoutes.delete(
  '/aulas/:id',
  AuthorizationMiddleware('professor', 'administrador'),
  asyncHandler(AulaController.delete),
);
aulaRoutes.put(
  '/aulas/:id',
  AuthorizationMiddleware('professor', 'administrador'),
  celebrate({ [Segments.BODY]: aulaSchema }),
  asyncHandler(AulaController.update),
);
