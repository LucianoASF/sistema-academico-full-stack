import { Router } from 'express';
import { AvaliacaoController } from '../controllers/avaliacao.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import { avaliacaoSchema } from '../schemas/avaliacao.schema.js';

export const avaliacaoRoutes = Router();

avaliacaoRoutes.post(
  '/avaliacoes',
  celebrate({ [Segments.BODY]: avaliacaoSchema }),
  asyncHandler(AvaliacaoController.create),
);
avaliacaoRoutes.get(
  '/avaliacoes/disciplinas-realizadas/:disciplinaRealizadaId',
  asyncHandler(AvaliacaoController.getAllByDisciplinaRealizada),
);
avaliacaoRoutes.get(
  '/avaliacoes/:id',
  asyncHandler(AvaliacaoController.getById),
);
avaliacaoRoutes.delete(
  '/avaliacoes/:id',
  asyncHandler(AvaliacaoController.delete),
);
avaliacaoRoutes.put(
  '/avaliacoes/:id',
  celebrate({ [Segments.BODY]: avaliacaoSchema }),
  asyncHandler(AvaliacaoController.update),
);
