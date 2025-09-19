import { Router } from 'express';
import { PresencaController } from '../controllers/presenca.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import {
  novaPresencaSchema,
  updatePresencaSchema,
} from '../schemas/presenca.schema.js';

export const presencaRoutes = Router();

presencaRoutes.post(
  '/presencas',
  celebrate({ [Segments.BODY]: novaPresencaSchema }),
  asyncHandler(PresencaController.create),
);
presencaRoutes.get(
  '/presencas/matriculas/:matriculaId/usuarios/:usuarioId',
  asyncHandler(PresencaController.getAllByMatricula),
);
presencaRoutes.get(
  '/presencas/aulas/:aulaId',
  asyncHandler(PresencaController.getAllByAula),
);
presencaRoutes.get('/presencas/:id', asyncHandler(PresencaController.getById));
presencaRoutes.delete(
  '/presencas/:id',
  asyncHandler(PresencaController.delete),
);
presencaRoutes.patch(
  '/presencas/:id',
  celebrate({ [Segments.BODY]: updatePresencaSchema }),
  asyncHandler(PresencaController.update),
);
