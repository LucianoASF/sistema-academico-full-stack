import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import {
  novoUsuarioSchema,
  updateUsuarioSchema,
} from '../schemas/usuario.schema.js';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware.js';
import { checkOwnershipMiddleware } from '../middlewares/checkOwnership.middleware.js';

export const usuarioRoutes = Router();

usuarioRoutes.post(
  '/usuarios',
  celebrate({ [Segments.BODY]: novoUsuarioSchema }),
  asyncHandler(UsuarioController.create),
);
usuarioRoutes.get(
  '/usuarios/perfil',
  AuthorizationMiddleware('aluno', 'professor', 'administrador'),
  asyncHandler(UsuarioController.perfilDecodificadoJwt),
);
usuarioRoutes.get(
  '/usuarios',
  AuthorizationMiddleware('administrador'),
  asyncHandler(UsuarioController.buscaUsuarios),
);
usuarioRoutes.get(
  '/usuarios/:id',
  AuthorizationMiddleware('aluno', 'professor', 'administrador'),
  checkOwnershipMiddleware(undefined, undefined, undefined, 'id'),
  asyncHandler(UsuarioController.getById),
);
usuarioRoutes.delete('/usuarios/:id', asyncHandler(UsuarioController.delete));
usuarioRoutes.patch(
  '/usuarios/:id',
  AuthorizationMiddleware('aluno', 'professor', 'administrador'),
  checkOwnershipMiddleware(undefined, undefined, undefined, 'id'),
  celebrate({ [Segments.BODY]: updateUsuarioSchema }),
  asyncHandler(UsuarioController.update),
);
