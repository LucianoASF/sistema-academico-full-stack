import { Router } from 'express';
import { AulaController } from '../controllers/aula.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import { aulaSchema } from '../schemas/aula.schema.js';

export const aulaRoutes = Router();

aulaRoutes.post(
  '/aulas',
  celebrate({ [Segments.BODY]: aulaSchema }),
  asyncHandler(AulaController.create),
);
aulaRoutes.get(
  '/aulas/disciplinas-realizadas/:disciplinaRealizadaId',
  asyncHandler(AulaController.getAllByDisciplinaRealizada),
);
aulaRoutes.get('/aulas/:id', asyncHandler(AulaController.getById));
aulaRoutes.delete('/aulas/:id', asyncHandler(AulaController.delete));
aulaRoutes.put(
  '/aulas/:id',
  celebrate({ [Segments.BODY]: aulaSchema }),
  asyncHandler(AulaController.update),
);
