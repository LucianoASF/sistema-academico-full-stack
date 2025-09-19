import { Router } from 'express';
import { NotaController } from '../controllers/nota.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import { novaNotaSchema, updateNotaSchema } from '../schemas/nota.schema.js';

export const notaRoutes = Router();

notaRoutes.post(
  '/notas',
  celebrate({ [Segments.BODY]: novaNotaSchema }),
  asyncHandler(NotaController.create),
);
notaRoutes.get(
  '/notas/matriculas/:matriculaId/usuarios/:usuarioId',
  asyncHandler(NotaController.getAllByMatricula),
);
notaRoutes.get('/notas/:id', asyncHandler(NotaController.getById));
notaRoutes.delete('/notas/:id', asyncHandler(NotaController.delete));
notaRoutes.patch(
  '/notas/:id',
  celebrate({ [Segments.BODY]: updateNotaSchema }),
  asyncHandler(NotaController.update),
);
