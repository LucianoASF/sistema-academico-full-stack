import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller.js';
import { celebrate, Segments } from 'celebrate';
import asyncHandler from 'express-async-handler';
import {
  novoUsuarioSchema,
  senhaSchema,
  updateUsuarioSchema,
} from '../schemas/usuario.schema.js';

export const usuarioRoutes = Router();

usuarioRoutes.post(
  '/usuarios',
  celebrate({ [Segments.BODY]: novoUsuarioSchema }),
  asyncHandler(UsuarioController.create),
);
usuarioRoutes.get('/usuarios/:id', asyncHandler(UsuarioController.getById));
usuarioRoutes.delete('/usuarios/:id', asyncHandler(UsuarioController.delete));
usuarioRoutes.patch(
  '/usuarios/:id',
  celebrate({ [Segments.BODY]: updateUsuarioSchema }),
  asyncHandler(UsuarioController.update),
),
  usuarioRoutes.patch(
    '/usuarios/:id/senha',
    celebrate({ [Segments.BODY]: senhaSchema }),
    asyncHandler(UsuarioController.updatePassword),
  );
