import { Router } from 'express';
import { DisciplinaRealizadaController } from '../controllers/disciplinaRealizada.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import { disciplinaRealizadaSchema } from '../schemas/disciplinaRealizada.schema.js';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware.js';
import { checkOwnershipMiddleware } from '../middlewares/checkOwnership.middleware.js';
import { AulaController } from '../controllers/aula.controller.js';
import { aulaSchema } from '../schemas/aula.schema.js';
import { AvaliacaoController } from '../controllers/avaliacao.controller.js';
import { avaliacaoSchema } from '../schemas/avaliacao.schema.js';
import {
  novaPresencaSchema,
  updatePresencaSchema,
} from '../schemas/presenca.schema.js';
import { PresencaController } from '../controllers/presenca.controller.js';
import { NotaController } from '../controllers/nota.controller.js';
import { novaNotaSchema, updateNotaSchema } from '../schemas/nota.schema.js';

export const disciplinaRealizadaRoutes = Router();

disciplinaRealizadaRoutes.post(
  '/disciplinas-realizadas',
  AuthorizationMiddleware('administrador'),
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
disciplinaRealizadaRoutes.get(
  '/disciplinas-realizadas/usuarios/:professorId',
  AuthorizationMiddleware('professor', 'administrador'),
  checkOwnershipMiddleware(undefined, undefined, undefined, 'professorId'),
  asyncHandler(DisciplinaRealizadaController.getDisciplinasEmCusroByProfessor),
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

// Aulas

disciplinaRealizadaRoutes.post(
  '/disciplinas-realizadas/:disciplinaRealizadaId/aulas',
  AuthorizationMiddleware('professor', 'administrador'),
  checkOwnershipMiddleware(
    'disciplinaRealizada',
    'disciplinaRealizadaId',
    'professorId',
  ),
  celebrate({ [Segments.BODY]: aulaSchema }),
  asyncHandler(AulaController.create),
);
disciplinaRealizadaRoutes.get(
  '/disciplinas-realizadas/:disciplinaRealizadaId/aulas',
  AuthorizationMiddleware('professor', 'administrador'),
  checkOwnershipMiddleware(
    'disciplinaRealizada',
    'disciplinaRealizadaId',
    'professorId',
  ),
  asyncHandler(AulaController.getAllByDisciplinaEmAndamento),
);
disciplinaRealizadaRoutes.get(
  '/aulas/:id',
  asyncHandler(AulaController.getById),
);
disciplinaRealizadaRoutes.delete(
  '/disciplinas-realizadas/aulas/:id',
  AuthorizationMiddleware('professor', 'administrador'),
  checkOwnershipMiddleware('aula', 'id', 'disciplinaRealizada.professorId'),
  asyncHandler(AulaController.delete),
);
disciplinaRealizadaRoutes.put(
  '/disciplinas-realizadas/aulas/:id',
  AuthorizationMiddleware('professor', 'administrador'),
  checkOwnershipMiddleware('aula', 'id', 'disciplinaRealizada.professorId'),
  celebrate({ [Segments.BODY]: aulaSchema }),
  asyncHandler(AulaController.update),
);

// avaliações

disciplinaRealizadaRoutes.post(
  '/avaliacoes',
  celebrate({ [Segments.BODY]: avaliacaoSchema }),
  asyncHandler(AvaliacaoController.create),
);
disciplinaRealizadaRoutes.get(
  '/avaliacoes/disciplinas-realizadas/:disciplinaRealizadaId',
  asyncHandler(AvaliacaoController.getAllByDisciplinaRealizada),
);
disciplinaRealizadaRoutes.get(
  '/avaliacoes/:id',
  asyncHandler(AvaliacaoController.getById),
);
disciplinaRealizadaRoutes.delete(
  '/avaliacoes/:id',
  asyncHandler(AvaliacaoController.delete),
);
disciplinaRealizadaRoutes.put(
  '/avaliacoes/:id',
  celebrate({ [Segments.BODY]: avaliacaoSchema }),
  asyncHandler(AvaliacaoController.update),
);

// presenças

disciplinaRealizadaRoutes.post(
  '/disciplinas-realizadas/aulas/:aulaId/presencas',
  AuthorizationMiddleware('professor', 'administrador'),
  checkOwnershipMiddleware('aula', 'aulaId', 'disciplinaRealizada.professorId'),
  celebrate({ [Segments.BODY]: novaPresencaSchema }),
  asyncHandler(PresencaController.create),
);
disciplinaRealizadaRoutes.get(
  '/disciplinas-realizadas/aulas/presencas/matriculas/:matriculaId/aluno',
  AuthorizationMiddleware('aluno', 'Administrador'),
  checkOwnershipMiddleware('matricula', 'matriculaId', 'alunoId'),
  asyncHandler(PresencaController.getAllByMatricula),
);
disciplinaRealizadaRoutes.get(
  '/disciplinas-realizadas/aulas/presencas/matriculas/:matriculaId/professor',
  AuthorizationMiddleware('professor', 'Administrador'),
  checkOwnershipMiddleware(
    'matricula',
    'matriculaId',
    'disciplinaRealizada.professorId',
  ),
  asyncHandler(PresencaController.getAllByMatricula),
);
disciplinaRealizadaRoutes.get(
  '/disciplinas-realizadas/aulas/:aulaId/presencas',
  AuthorizationMiddleware('professor', 'administrador'),
  checkOwnershipMiddleware('aula', 'aulaId', 'disciplinaRealizada.professorId'),
  asyncHandler(PresencaController.getAllByAula),
);
disciplinaRealizadaRoutes.get(
  '/presencas/:id',
  asyncHandler(PresencaController.getById),
);
disciplinaRealizadaRoutes.delete(
  '/presencas/:id',
  asyncHandler(PresencaController.delete),
);
disciplinaRealizadaRoutes.patch(
  '/disciplinas-realizadas/aulas/:aulaId/presencas',
  AuthorizationMiddleware('professor', 'administrador'),
  checkOwnershipMiddleware('aula', 'aulaId', 'disciplinaRealizada.professorId'),
  celebrate({ [Segments.BODY]: updatePresencaSchema }),
  asyncHandler(PresencaController.update),
);

// notas

disciplinaRealizadaRoutes.post(
  '/notas',
  celebrate({ [Segments.BODY]: novaNotaSchema }),
  asyncHandler(NotaController.create),
);
disciplinaRealizadaRoutes.get(
  '/disciplinas-realizadas/avaliacoes/notas/matriculas/:matriculaId',
  AuthorizationMiddleware('aluno', 'administrador'),
  checkOwnershipMiddleware('matricula', 'matriculaId', 'alunoId'),
  asyncHandler(NotaController.getAllByMatricula),
);
disciplinaRealizadaRoutes.get(
  '/notas/:id',
  asyncHandler(NotaController.getById),
);
disciplinaRealizadaRoutes.delete(
  '/notas/:id',
  asyncHandler(NotaController.delete),
);
disciplinaRealizadaRoutes.patch(
  '/notas/:id',
  celebrate({ [Segments.BODY]: updateNotaSchema }),
  asyncHandler(NotaController.update),
);
