import { Router } from 'express';
import { DisciplinaRealizadaController } from '../controllers/disciplinaRealizada.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import { disciplinaRealizadaSchema } from '../schemas/disciplinaRealizada.schema.js';

export const disciplinaRealizadaRoutes = Router();

disciplinaRealizadaRoutes.post(
  '/disciplinas-realizadas',
  celebrate({ [Segments.BODY]: disciplinaRealizadaSchema }),
  asyncHandler(DisciplinaRealizadaController.create),
);
disciplinaRealizadaRoutes.get(
  '/disciplinas-realizadas',
  asyncHandler(DisciplinaRealizadaController.getAll),
);
disciplinaRealizadaRoutes.get(
  '/disciplinas-realizadas/:id',
  asyncHandler(DisciplinaRealizadaController.getById),
);
disciplinaRealizadaRoutes.delete(
  '/disciplinas-realizadas/:id',
  asyncHandler(DisciplinaRealizadaController.delete),
);
disciplinaRealizadaRoutes.put(
  '/disciplinas-realizadas/:id',
  celebrate({ [Segments.BODY]: disciplinaRealizadaSchema }),
  asyncHandler(DisciplinaRealizadaController.update),
);
